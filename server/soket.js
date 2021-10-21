const express = require('express');
const app = express();
var server = require('http').createServer(app);
const socketio = require('socket.io')
const io = socketio.listen(server)

io.on("connection", socket => {
    console.log("연결!");
})

server.listen(1000, function () {
    console.log('Example app listening on port', 1000);
});