import { useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "../features/Chat/chatThunk.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import { socket } from "../lib/socket.js";
import PropTypes from 'prop-types';

// Memoized Message component to prevent unnecessary re-renders
const Message = memo(({ message, prevMessage, selectedUser }) => {
  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1).toISOString().split('T')[0];
    const d2 = new Date(date2).toISOString().split('T')[0];
    return d1 === d2;
  };

  const showDateHeader = !prevMessage || !isSameDay(prevMessage.updatedAt, message.updatedAt);
  const showProfileImage = !prevMessage || prevMessage.senderId._id !== message.senderId._id || !isSameDay(prevMessage.updatedAt, message.updatedAt);

  return (
    <>
      {showDateHeader && (
        <div className="text-center text-sm w-fit mx-auto p-2 my-4 font-semibold bg-base-300 text-base-content/60 select-none">
          {isSameDay(message.updatedAt, new Date()) ? "Today" : message.updatedAt.split('T')[0]}
        </div>
      )}
      <div className={`flex flex-col ${message.senderId._id === selectedUser._id ? "items-start" : "items-end"} select-none`}>
        <div className={`flex items-start gap-2 ${message.senderId._id === selectedUser._id ? "flex-row-reverse" : ""}`}>
          <div className={`p-2 rounded-lg shadow-md ${message.senderId._id === selectedUser._id ? "bg-base-300" : "bg-primary text-primary-content"} max-w-[10rem] sm:max-w-[15rem] md:max-w-[20rem] space-y-2`}>
            {message.image && <img src={message.image} className="w-fit object-cover no-drag" alt="sender image" />}
            <div className="flex flex-col gap-1">
              <p className="text-base">{message.text}</p>
              <div className="flex w-full justify-end">
                <p className={`text-[0.6rem] font-semibold ${message.senderId._id === selectedUser._id ? "text-base-content/70" : "text-primary-content/70"}`}>
                  {new Date(message.updatedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
          <div>
            {showProfileImage && message.senderId._id !== selectedUser._id ? (
              <img
                src={message.senderId.profileImage || "/avatarDemo.png"}
                className="size-10 rounded-full object-cover no-drag"
                alt="profile"
              />
            ) : (
              message.senderId._id !== selectedUser._id && <img className="size-10 rounded-full invisible no-drag" src="" alt="" />
            )}
          </div>
        </div>
      </div>
    </>
  );
});
Message.displayName = "Message";

const ChatContainer = () => {
  const { chatMessages, isChatLoading, selectedUser } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const chatMessagesRef = useRef(null);
  const lastMessageLength = useRef(chatMessages.length);

  // Scroll to bottom with debounced effect
  useEffect(() => {
    if (!isChatLoading && chatMessagesRef.current && chatMessages.length > lastMessageLength.current) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    lastMessageLength.current = chatMessages.length;
  }, [chatMessages, isChatLoading]);

  // Fetch messages and cleanup socket
  useEffect(() => {
    if (!selectedUser?._id) return;
    dispatch(fetchChatMessages(selectedUser._id));

    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser?._id, dispatch]);

  return (
    <div className="h-full flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div
        ref={chatMessagesRef}
        className="flex-1 flex flex-col overflow-y-auto bg-base-100 gap-1 p-5"
      >
        {isChatLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-sm font-semibold text-base-content/60">Loading...</div>
          </div>
        ) : chatMessages.length > 0 ? (
          chatMessages.map((message, idx) => (
            <Message
              key={message._id}
              message={message}
              prevMessage={chatMessages[idx - 1]}
              selectedUser={selectedUser}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-sm w-fit mx-auto p-2 my-4 font-semibold bg-base-300 text-base-content/60 select-none">
              No messages yet.<br />Start the conversation!
            </div>
          </div>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

ChatContainer.displayName = "ChatContainer";

Message.propTypes = {
  message: PropTypes.object.isRequired,
  prevMessage: PropTypes.object,
  selectedUser: PropTypes.object.isRequired,
};

export default memo(ChatContainer);