const Server = require("socket.io").Server;
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
// userId and Socket id
const userSocketMap = {}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true
  },
});


io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("A USER CONNECT", socket.id);
  if(userId) userSocketMap[userId] = socket.id;
  
  // io emit() is used to send events to all the coonected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("disconnect", (socket) => {
    console.log("A USER DISCONNECTED", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});

const getReciverSocketId = (userId) =>{
  return userSocketMap[userId];
}


module.exports = { io, app, server ,getReciverSocketId };
