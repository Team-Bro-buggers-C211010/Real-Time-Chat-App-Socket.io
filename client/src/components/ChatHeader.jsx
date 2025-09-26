import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../features/Chat/chatSlice.js";
import { CircleX } from "lucide-react";
import { memo } from "react";

const ChatHeader = () => {
    const { selectedUser } = useSelector((state) => state.chat);
    const { onlineUsers } = useSelector((state) => state.socket);
    const dispatch = useDispatch();

    if (!selectedUser?._id) {
        return null;
    }

    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="flex justify-between items-center p-4 border-b border-base-300 bg-base-100">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                        src={selectedUser.profileImage || "/avatarDemo.png"}
                        alt={`${selectedUser.userName}'s avatar`}
                        className="size-10 md:size-12 rounded-full object-cover no-drag"
                    />
                    <span
                        className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-base-900 ${isOnline ? "bg-green-500" : "bg-base-content/50"
                            }`}
                    />
                </div>
                <div className="flex flex-col">
                    <h2 className="font-semibold text-base md:text-lg">{selectedUser.userName}</h2>
                    <div>
                        <h3 className="text-sm font-medium text-base-content/80">{selectedUser.fullName}</h3>
                        <p
                            className={`text-xs font-semibold ${isOnline ? "text-green-500" : "text-base-content/60"
                                }`}
                        >
                            {isOnline ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-circle btn-sm text-base-content/60 hover:text-base-content"
                onClick={() => dispatch(setSelectedUser(null))}
            >
                <CircleX className="size-5" />
            </button>
        </div>
    );
};

ChatHeader.displayName = "ChatHeader";

export default memo(ChatHeader);