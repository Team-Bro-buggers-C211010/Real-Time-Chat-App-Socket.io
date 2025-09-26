import { useEffect, useMemo, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessages } from "../features/Chat/chatThunk.js";
import { Users } from "lucide-react";
import { setSelectedUser } from "../features/Chat/chatSlice.js";

const UserSideBar = () => {
  const { lastMessagesForAllSidebarsUsers, selectedUser, isLastMessagesLoading } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.socket);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const dispatch = useDispatch();

  // Memoized filtered users to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    return showOnlineUsers
      ? lastMessagesForAllSidebarsUsers.filter(({ user }) => onlineUsers.includes(user._id))
      : lastMessagesForAllSidebarsUsers;
  }, [lastMessagesForAllSidebarsUsers, onlineUsers, showOnlineUsers]);

  // Fetch last messages on mount
  useEffect(() => {
    dispatch(fetchLastMessages());
  }, [dispatch]);

  // Format timestamp: "Today", "Yesterday", or "MM/DD/YYYY"
  const formatTimestamp = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (createdAt) => {
      if (!createdAt) return "";
      const messageDate = new Date(createdAt);

      const isToday =
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();
      const isYesterday =
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear();

      if (isToday) return "Today";
      if (isYesterday) return "Yesterday";
      return messageDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    };
  }, []);

  // Memoized user name formatting to avoid redundant calculations
  const formatUserName = (userName, maxLength) => {
    if (!userName) return "";
    const capitalized = userName[0].toUpperCase() + userName.slice(1);
    return userName.length > maxLength ? `${capitalized.slice(0, maxLength)}...` : capitalized;
  };

  if (isLastMessagesLoading) {
    return (
      <div className="flex justify-center items-center h-full text-base-content/60">
        <div className="animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <aside
      className={`h-full w-full sm:w-1/4 lg:w-1/3 border-r border-base-300 flex flex-col transition-all duration-200 ${selectedUser ? "hidden sm:flex" : "flex"
        }`}
    >
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <h2 className="font-medium">Contacts</h2>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <input
            type="checkbox"
            checked={showOnlineUsers}
            onChange={() => setShowOnlineUsers((prev) => !prev)}
            className="checkbox checkbox-sm"
          />
          <p className="text-xs md:text-sm">Show only online users</p>
        </div>
        <span className="text-xs text-base-content/50">
          ({onlineUsers.length - 1} online)
        </span>
      </div>
      <ul className="w-full flex-1 overflow-y-auto py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(({ user, lastMessage }) => (
            <li
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`w-full flex items-center gap-3 p-3 hover:bg-base-300 cursor-pointer ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
                }`}
            >
              <div className="relative">
                <img
                  src={user.profileImage || "/avatarDemo.png"}
                  alt={`${user.userName}'s avatar`}
                  className="size-10 md:size-12 rounded-full object-cover no-drag"
                />
                <span
                  className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-base-900 ${onlineUsers.includes(user._id) ? "bg-green-500" : "bg-base-content/50"
                    }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold hidden lg:block">{formatUserName(user.userName, 20)}</p>
                <p className="font-semibold hidden sm:block lg:hidden">
                  {formatUserName(user.userName, 10)}
                </p>
                <p className="font-semibold sm:hidden">{formatUserName(user.userName, 20)}</p>
                <p className="text-xs md:text-sm text-base-content/70 truncate flex justify-between">
                  {lastMessage ? (
                    <>
                      <span>{lastMessage.text || (lastMessage.image && "Attachment...")}</span>
                      <span className="ml-2 text-xs">{formatTimestamp(lastMessage.createdAt)}</span>
                    </>
                  ) : (
                    "No messages yet"
                  )}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center text-base-content/50 py-4">
            {showOnlineUsers ? "No online users" : "No users found"}
          </div>
        )}
      </ul>
    </aside>
  );
};

UserSideBar.displayName = "UserSideBar";

export default memo(UserSideBar);