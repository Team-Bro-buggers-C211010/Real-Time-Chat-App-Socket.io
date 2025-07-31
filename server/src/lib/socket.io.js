// backend/lib/socket.io.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  path: "/socket.io/",
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connect", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId || "anonymous";
  
  if(userId){
    userSocketMap[userId] = socket.id;
  }

  console.log("Updated userSocketMap:", userSocketMap);

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

io.on("error", (error) => {
  console.error("Socket.IO server error:", error);
});

io.on("connect_error", (error) => {
  console.error("Socket.IO connect error:", error);
});

export { io, app, server };
