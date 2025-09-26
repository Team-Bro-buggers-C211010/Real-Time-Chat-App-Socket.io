import { useSelector } from "react-redux";
import UserSideBar from "../components/UserSideBar";
import ChatContainer from "../components/ChatContainer";
import EmptyChat from "../components/EmptyChat";
import { memo } from "react";

const Home = () => {
  const { selectedUser } = useSelector((state) => state.chat);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center pt-20 px-4 sm:px-6">
      <div className="bg-base-100 rounded-lg shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)] flex overflow-hidden">
        <UserSideBar />
        <div className="flex-1">
          {selectedUser ? <ChatContainer /> : <EmptyChat />}
        </div>
      </div>
    </div>
  );
};

Home.displayName = "Home";

export default memo(Home);