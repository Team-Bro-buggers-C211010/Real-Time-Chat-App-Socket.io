import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "../features/Chat/chatThunk";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { chatMessages, isChatLoading, selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatMessages(selectedUser._id));
  }, [dispatch, selectedUser._id]);
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="h-full flex flex-col overflow-auto gap-5 p-5">
        {
          isChatLoading ? <div>Loading...</div> : chatMessages.map((message) => {
            console.log(message);
            return (
              <div key={message._id} className={`flex flex-col ${message.senderId._id === selectedUser._id ? "items-start" : "items-end"}`}>
                <div className={`flex items-center gap-2 ${message.senderId._id === selectedUser._id ? "flex-row-reverse" : ""}`}>
                  <div className="p-2 rounded-lg bg-primary/20 w-fit max-w-md space-y-2">
                    {message?.image && <img src={message?.image} className="size-20 sm:size-28 md:size-36 object-cover" alt="sender image" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className="items-start">
                    <img src={message.senderId._id === selectedUser._id ? selectedUser?.profileImage : message.senderId?.profileImage != "" ? message.senderId?.profileImage : "/avatarDemo.png"} className="size-12 rounded-full object-cover" alt="" />
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