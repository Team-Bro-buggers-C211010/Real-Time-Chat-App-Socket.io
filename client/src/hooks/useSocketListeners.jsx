import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socket } from "../lib/socket";
import { setOnlineUsers } from "../features/Socket.io/socketSlice";

export const useSocketListeners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("getOnlineUsers", (userIds) => {
      dispatch(setOnlineUsers(userIds));
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [dispatch]);
};