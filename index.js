const express=require('express');
const http = require('http');
const socketio =require('socket.io');
const app=express();
const server = http.createServer(app);
const io=socketio(server);


app.use('/',express.static(__dirname + '/public'));

//instead of app.js we use server.listen beacuse app comes from express object and server comes from socket.io which we will required;

server.listen(3000,()=>{
    console.log("server started at port 3000");
});



