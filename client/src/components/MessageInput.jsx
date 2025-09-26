import { Image, Send, Smile, X } from "lucide-react";
import { useEffect, useRef, useState, memo } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessages, sendMessage } from "../features/Chat/chatThunk.js";
import { setPushNewChatMessages } from "../features/Chat/chatSlice.js";
import { socket } from "../lib/socket.js";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  const currentUserId = authUser?._id;
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null); // Use null instead of empty string for clarity
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Handle image upload with validation
  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Limit to 5MB
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() && !attachment) {
      toast.error("Please enter a message or select an image");
      return;
    }

    try {
      await dispatch(
        sendMessage({ message: message.trim(), attachment, receiverId: selectedUser._id })
      ).unwrap();
      setMessage("");
      setAttachment(null);
      setShowEmojiPicker(false);
      fileInputRef.current.value = null;
    } catch (error) {
      toast.error("Failed to send message" + error?.message);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  // Socket handling for new messages
  useEffect(() => {
    if (!selectedUser?._id || !currentUserId) return;

    const handleNewMessage = async (newMessage) => {
      if (!newMessage?._id) return;

      if (newMessage.senderId._id === selectedUser._id && newMessage.receiverId._id === currentUserId) {
        await dispatch(setPushNewChatMessages(newMessage));
        await dispatch(fetchLastMessages());
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedUser?._id, currentUserId]);

  return (
    <div className="p-4 w-full bg-base-100">
      {attachment && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              className="size-12 md:size-16 object-cover rounded-lg border border-base-300"
              src={attachment}
              alt="Preview Attachment"
            />
            <button
              onClick={() => {
                setAttachment(null);
                fileInputRef.current.value = null;
              }}
              className="absolute -top-1.5 -right-1.5 size-5 bg-base-300 text-red-500 rounded-full flex items-center justify-center"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleMessageSubmit} className="flex items-center gap-2">
        <div className="relative flex-1 flex gap-2 items-center">
          {showEmojiPicker && (
            <div className="absolute bottom-14 left-0 z-10">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                theme="auto"
                emojiStyle="google"
                lazyLoadEmojis={true}
                width={300}
                height={400}
              />
            </div>
          )}
          <button
            type="button"
            className="btn btn-circle btn-sm text-base-content"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile className="size-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 input input-bordered rounded-full input-sm sm:input-md"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
          <button
            type="button"
            className={`btn btn-circle btn-sm ${attachment ? "text-base-content" : "text-base-content/50"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-circle btn-sm"
          disabled={!message.trim() && !attachment}
        >
          <Send
            className={`size-5 ${message.trim() || attachment ? "text-base-content" : "text-base-content/50"}`}
          />
        </button>
      </form>
    </div>
  );
};

MessageInput.displayName = "MessageInput";

export default memo(MessageInput);