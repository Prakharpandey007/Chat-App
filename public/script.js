var socket = io();   //this socket objects emits a connection event.

let btn=document.getElementById('btn');
let inputMsg=document.getElementById('newmsg');
let msgList=document.getElementById('msglist');

btn.onclick=function exec(){
    socket.emit('msg_send',{
        msg:inputMsg.value
    })
}
socket.on('msg_recieved',(data)=>{
    console.log(data);
    let limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msgList.appendChild(limsg);
})

