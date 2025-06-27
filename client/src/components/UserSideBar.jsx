import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/Chat/chatThunk";
import { Users } from "lucide-react";
import { setSelectedUser } from "../features/Chat/chatSlice";

const UserSideBar = () => {
  const { users, selectedUser, isUserLoading } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }


  return (
    <aside className="h-full w-1/4 lg:w-1/3 border-r border-base-300 flex-col transition-all duration-200 hidden sm:flex">
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6"/>
          <h2 className="font-medium hidden lg:block">Contacts</h2>
        </div>
      </div>
      <ul className="w-full overflow-y-auto py-3">
        {
          users.map((user) => {
            return (
              <li key={user._id} onClick={() => dispatch(setSelectedUser(user))} className={`w-full flex flex-wrap items-center gap-3 p-3 hover:bg-base-300 cursor-pointer ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                <div>
                  <img src={user.profileImage || "/avatarDemo.png"} alt={user.userName} className="size-12 rounded-full object-cover" />
                </div>
                <div className="block text-left min-w-0">
                  <p className="font-semibold">{user?.userName[0].toUpperCase() + user?.userName.slice(1)}</p>
                </div>
              </li>
            );
          })
        }
      </ul>
    </aside>
  )
}

export default UserSideBar