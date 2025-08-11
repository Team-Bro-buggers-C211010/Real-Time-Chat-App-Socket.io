import { Image, Send, Smile, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessages, sendMessage } from "../features/Chat/chatThunk";
import { setPushNewChatMessages } from "../features/Chat/chatSlice";
import { socket } from "../lib/socket";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);
  const currentUserId = authUser?._id;
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!message && !attachment) {
      toast.error("Please enter a message or select an image to send!!!");
      return;
    }
    await dispatch(
      sendMessage({ message, attachment, receiverId: selectedUser._id })
    );
    await dispatch(fetchLastMessages());
    setMessage("");
    setAttachment("");
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };


  useEffect(() => {
    if (!selectedUser?._id || !currentUserId) {
      console.warn("Skipping socket listener due to missing user IDs");
      return;
    }

    const handleNewMessage = (newMessage) => {
      console.log("Received newMessage:", newMessage);
      if (!newMessage?._id) {
        console.warn("Invalid message received:", newMessage);
        return;
      }
      if (
        (newMessage.senderId._id === currentUserId &&
          newMessage.receiverId._id === selectedUser._id) ||
        (newMessage.senderId._id === selectedUser._id &&
          newMessage.receiverId._id === currentUserId)
      ) {
        dispatch(setPushNewChatMessages(newMessage));
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
              className="size-12 md:size-16 object-cover rounded-lg border border-zinc-700"
              src={attachment}
              alt="Preview Attachment"
            />
            <button
              onClick={() => setAttachment("")}
              className="absolute -top-1.5 -right-1.5 size-5 bg-base-300 text-red-500 rounded-full flex items-center justify-center cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleMessageSubmit} className="flex items-center gap-2">
        <div className="relative flex-1 flex gap-2 items-center">
          {showEmojiPicker && (
            <div
              className="absolute bottom-14 left-0 z-10"
            >
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
          {/* Smiley Button */}
          <button
            type="button"
            className="font-bold flex text-base-content btn btn-circle"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <Smile className="size-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full input input-bordered rounded-full input-sm sm:input-md"
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
            className={`font-bold flex text-base-content btn btn-circle ${
              attachment ? "text-base-content" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="cursor-pointer"
          disabled={!message && !attachment}
        >
          <Send
            className={`size-5 ${
              message || attachment
                ? "text-base-content"
                : "text-zinc-400 cursor-not-allowed"
            }`}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;