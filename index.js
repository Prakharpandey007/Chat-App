const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// this "io" object from script.js connected a user.
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on('msg_send',(data)=>{
    console.log(data);
    // io.emit('msg_recieved',data);    // for all the web socket connection with this sever
    // socket.emit('msg_recieved',data);  //for only particular socket client
    socket.broadcast.emit('msg_recieved',data);
    
  })
  //socket.on listen the event from client;
 
//this message is emit after every 2sec.

});

app.use("/", express.static(__dirname + "/public"));

//instead of app.js we use server.listen beacuse app comes from express object and server comes from socket.io which we will required;

server.listen(3000, () => {
  console.log("server started at port 3000");
});

