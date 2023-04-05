import * as http from 'http';
import { Server } from 'socket.io';


const server = http.createServer(); //webserver creation
// const io = new Server(server); //websocket server created from webserver created above as we imprted derver from socekt.io   -- can be a problem
const io = new Server(server, {
    cors: {origin: "http://localhost:3000"}
    // {/* to identify client, clients running on 3000 port on default */}
})

io.on('connection', (socket) => {
    console.log("New user connected: " + socket.id);
    socket.on('disconnect', () => {
        console.log("User disconnected: " + socket.id);
    });
    socket.on('message', (msg) => {
        console.log("Message from client: " + msg);
        socket.broadcast.emit('message', msg);
    })

});


const port = 9000;
server.listen(port, () => {
    console.log("Server listening on port: "+ port);
})
