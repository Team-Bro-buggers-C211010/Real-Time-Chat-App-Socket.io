import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../features/Chat/chatSlice";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
    const { selectedUser } = useSelector((state) => state.chat);
    const { onlineUsers } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between items-center p-2 border-b border-base-300">
            <div className="flex items-center gap-2">
                <img src={selectedUser.profileImage || "/avatarDemo.png"} alt={selectedUser.userName} className="size-12 rounded-full object-cover" />
                <div className="flex flex-col">
                    <h2 className="font-semibold">{selectedUser.userName}</h2>
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
            </div>
            <CircleX className="size-6 cursor-pointer" onClick={() => dispatch(setSelectedUser(null))} />
        </div>
    )
}

export default ChatHeader