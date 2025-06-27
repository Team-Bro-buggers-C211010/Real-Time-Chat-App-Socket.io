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
  },[dispatch, selectedUser._id]);
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div>Messages</div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer