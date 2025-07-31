// frontend/lib/socket.js
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(BASE_URL, {
  autoConnect: false,
  withCredentials: true,
  path: "/socket.io/",
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message, err);
});

socket.on("error", (err) => {
  console.error("Socket error:", err);
});