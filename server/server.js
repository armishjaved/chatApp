"use strict";
exports.__esModule = true;
var http = require("http");
var socket_io_1 = require("socket.io");
var server = http.createServer(); //webserver creation
// const io = new Server(server); //websocket server created from webserver created above as we imprted derver from socekt.io   -- can be a problem
var io = new socket_io_1.Server(server, {
    cors: { origin: "http://localhost:3000" }
    // {/* to identify client, clients running on 3000 port on default */}
});
io.on('connection', function (socket) {
    console.log("New user connected: " + socket.id);
    socket.on('disconnect', function () {
        console.log("User disconnected: " + socket.id);
    });
    socket.on('message', function (msg) {
        console.log("Message from client: " + msg);
        socket.broadcast.emit('message', msg);
    });
});
var port = 9000;
server.listen(port, function () {
    console.log("Server listening on port: " + port);
});
