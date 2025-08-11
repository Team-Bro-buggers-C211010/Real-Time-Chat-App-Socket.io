import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastMessages } from "../features/Chat/chatThunk";
import { Users } from "lucide-react";
import { setSelectedUser } from "../features/Chat/chatSlice";

const UserSideBar = () => {
  const { lastMessagesForAllSidebarsUsers, selectedUser, isLastMessagesLoading } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.socket);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const dispatch = useDispatch();

  // Filter users based on online status
  const filteredUsers = showOnlineUsers
    ? lastMessagesForAllSidebarsUsers.filter(({ user }) => onlineUsers.includes(user._id))
    : lastMessagesForAllSidebarsUsers;

  useEffect(() => {
    dispatch(fetchLastMessages());
  }, [dispatch]);

  // Format timestamp: "Today", "Yesterday", or "MM/DD/YYYY"
  const formatTimestamp = (createdAt) => {
    if (!createdAt) return "";
    const messageDate = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

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

  if (isLastMessagesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <aside
      className={`h-full w-full sm:w-1/4 lg:w-1/3 border-r border-base-300 flex-col transition-all duration-200 ${
        selectedUser ? "hidden sm:flex" : "flex"
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
            onChange={() => setShowOnlineUsers(!showOnlineUsers)}
          />
          <p className="text-xs md:text-sm">Show only online users</p>
        </div>
        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
      </div>
      <ul className="w-full overflow-y-auto py-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(({ user, lastMessage }) => (
            <li
              key={user._id}
              onClick={() => dispatch(setSelectedUser(user))}
              className={`w-full flex flex-wrap items-center gap-3 p-3 hover:bg-base-300 cursor-pointer ${
                selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.profileImage || "/avatarDemo.png"}
                  alt={user.userName}
                  className="size-12 sm:size-10 md:size-12 rounded-full object-cover no-drag"
                />
                {onlineUsers.includes(user._id) ? (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                ) : (
                  <span className="absolute bottom-0 right-0 size-3 bg-zinc-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>
              <div className="block text-left min-w-0 flex-1">
                <p className="font-semibold hidden lg:block">
                  {user?.userName[0].toUpperCase() + user?.userName.slice(1)}
                </p>
                <p className="text-xs md:text-base font-semibold hidden sm:block lg:hidden">
                  {user?.userName.length > 10
                    ? user?.userName[0].toUpperCase() + user?.userName.slice(1, 10) + "..."
                    : user?.userName[0].toUpperCase() + user?.userName.slice(1)}
                </p>
                <p className="text-xs md:text-sm sm:hidden font-semibold">
                  {user?.userName.length > 20
                    ? user?.userName[0].toUpperCase() + user?.userName.slice(1, 20) + "..."
                    : user?.userName[0].toUpperCase() + user?.userName.slice(1)}
                </p>
                <p className="text-xs text-base-content/70 truncate flex justify-between">
                  {lastMessage ? (
                    <>
                      {lastMessage.text || (lastMessage.image && "Attachment...")}
                      <span className="ml-2 text-xs">
                        {formatTimestamp(lastMessage.createdAt)}
                      </span>
                    </>
                  ) : (
                    "No messages yet"
                  )}
                </p>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </ul>
    </aside>
  );
};

export default UserSideBar;