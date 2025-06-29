import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "../features/Chat/chatThunk";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { chatMessages, isChatLoading, selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    dispatch(fetchChatMessages(selectedUser._id));
  }, [dispatch, selectedUser._id]);

  useEffect(() => {
  if (!isChatLoading && chatMessagesRef.current) {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }
}, [chatMessages, isChatLoading]); // Dependencies are crucial here!
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div ref={chatMessagesRef} className="h-full flex flex-col overflow-auto bg-base-100 gap-1 p-5">
        {
          isChatLoading ? <div>Loading...</div> : chatMessages.map((message, idx) => {
            return (
              <div key={message._id} className={`flex flex-col ${message.senderId._id === selectedUser._id ? "items-start" : "items-end"}`}>
                <div className={`flex items-start gap-2 ${message.senderId._id === selectedUser._id ? "flex-row-reverse" : ""}`}>
                  <div className={`p-2 rounded-lg ${message.senderId._id === selectedUser._id ? "bg-base-200" : "bg-primary text-primary-content"} max-w-[10rem] sm:max-w-[15rem] md:max-w-[20rem] space-y-2`}>
                    {message?.image && <img src={message?.image} className="w-fit object-cover" alt="sender image" />}
                    <div className="flex items-end justify-between gap-2 sm:gap-3 md:gap-4">
                      <p className="text-sm">{message.text}</p>
                      <p className="text-[0.6rem] text-zinc-500">{message.updatedAt.split("T")[1].split(".")[0]}</p>
                    </div>
                  </div>
                  <div>
                    {
                      chatMessages[idx - 1]?.senderId._id !== message?.senderId._id ? (
                        <img src={message.senderId._id === selectedUser._id ? "" : message.senderId?.profileImage != "" ? message.senderId?.profileImage : "/avatarDemo.png"} className={`size-6 sm:size-8 md:size-10 rounded-full object-cover ${message.senderId._id === selectedUser._id && "hidden"}`} alt="" />
                      ) : <img className="size-6 sm:size-8 md:size-10  rounded-full invisible" src="" alt="" />
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer