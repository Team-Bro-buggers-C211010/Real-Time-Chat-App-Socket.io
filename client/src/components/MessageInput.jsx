import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages, sendMessage } from "../features/Chat/chatThunk";

const MessageInput = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(!file.type.includes('image')) {
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAttachment(reader.result);
    };
  }

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if(!message && !attachment) {
      toast.error('Please enter a message or select an image to send!!!');
      return;
    }
    await dispatch(sendMessage({ message, attachment, receiverId: selectedUser._id }));
    setMessage("");
    setAttachment("");
    await dispatch(fetchChatMessages(selectedUser._id));
  }

  return (
    <div className="p-4 w-full">
      {
        attachment  && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img className="size-12 md:size-16 object-cover rounded-lg border border-zinc-700" src={attachment} alt="Preview Attachment" />
              <button onClick={() => setAttachment('')} className="absolute -top-1.5 -right-1.5 size-5 bg-base-300 text-red-500 rounded-full flex items-center justify-center cursor-pointer">
                <X className="size-4" />
              </button>
            </div>
          </div>
        )
      }
      <form onSubmit={handleMessageSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full input input-bordered rounded-lg input-sm sm:input-md" />
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImage} className="hidden" />
          {/* <button type="button" className={`hidden sm:flex btn btn-circle ${attachment ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => document.querySelector('input[type="file"]').click()}><Image className="size-5"/></button> */}
          <button type="button" className={`font-bold flex text-base-content btn btn-circle ${attachment ? "text-emerald-500" : "text-zinc-400"}`} onClick={() => fileInputRef.current?.click()}><Image className="size-5"/></button>
        </div>
        <button type="submit" className="cursor-pointer" disabled={!message && !attachment}>
          <Send className={`size-5 ${message || attachment ? "text-emerald-500" : "text-zinc-400 cursor-not-allowed"}`} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput