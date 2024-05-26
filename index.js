// const express = require("express");
// const http = require("http");
// const socketio = require("socket.io");
// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);
// const connect=require('./config/databaseconfig');
// const Chat=require('./models/chat');
// // this "io" object from script.js connected a user.
// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);
// socket.on('join_room',(data)=>{
//   console.log("joining a room",data.roomid);
//   socket.join(data.roomid);
  
// });

//   socket.on('msg_send',async(data)=>{
//     console.log(data);
// const chat=await Chat.create({
//   roomId:data.roomid,
//   user:data.username,
//   content:data.msg

// });
//     io.to(data.roomid).emit('msg_recieved',data);    // for all the web socket connection with this sever
//   });



//     // socket.emit('msg_recieved',data);  //for only particular socket client
//     // socket.broadcast.emit('msg_recieved',data);


    
  
//   //socket.on listen the event from client;
 
// //this message is emit after every 2sec.


// socket.on('typing',(data)=>{
//   socket.broadcast.to(data.roomid).emit('someone_typing');
// });

// });
// app.set('view engine','ejs');
// app.use("/", express.static(__dirname + "/public"));


// app.get('/chat/:roomid',async(req,res)=>{
//   const chats=await Chat.find({
//     roomId:req.params.roomid
//   }).select('content user');
//   console.log(chats);
//   res.render('index',{
//     name:'pandey',
//     id:req.params.roomid,
// chats:chats
//   });

// })
// //instead of app.js we use server.listen beacuse app comes from express object and server comes from socket.io which we will required;
// server.listen(3000, async () => {
//   console.log("server started at port 3000");
// await connect();
// console.log("mongo db connected");

// });



const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const connect = require('./config/databaseconfig');

const Chat = require('./models/chat');
// this "io" object from script.js connected a user.
const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log("a user connected", socket.id);
    socket.on('join_room', (data) => {
        console.log("joining a room", data.roomid)
        socket.join(data.roomid);
    });

    socket.on('msg_send', async (data) => {
        console.log(data);
        const chat = await Chat.create({
            roomId: data.roomid,
            user: data.username,
            content: data.msg
        });
        io.to(data.roomid).emit('msg_rcvd', data);        // for all the web socket connection with this sever
    });

    socket.on('typing', (data) => {
        socket.broadcast.to(data.roomid).emit('someone_typing'); //for only particular socket client
    })
});
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'));

app.get('/chat/:roomid', async (req, res) => {
    const chats = await Chat.find({
        roomId: req.params.roomid
    }).select('content user');
    console.log(chats);
    res.render('index', {
        name: 'Sanket',
        id: req.params.roomid,
        chats: chats
    });
});

server.listen(3000, async () => {
    console.log('Server started');
    await connect();
    console.log("mongo db connected")
});