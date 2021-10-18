//server.ts

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 5000;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("join", ({ roomName: room, userName: user }) => {
    socket.join(room);
    io.to(room).emit("onConnect", `${user} 님이 입장했습니다.`);
    
    socket.on("onSend", (messageItem) => {
      io.to(room).emit("onReceive", messageItem);
    });
    
    socket.on("disconnect", () => {
      socket.leave(room);
      io.to(room).emit("onDisconnect", `${user} 님이 퇴장하셨습니다.`);
    });
});
});

server.listen(port, () => console.log(`Listening on port ${port}`));