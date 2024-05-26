const mongoose=require('mongoose');
const connect=async()=>{
    await mongoose.connect("mongodb+srv://prakharharshit2003:74iFuiLwWefrbM7z@cluster0.jrwrmfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");       
             //using mongoose.connect() we will connect with mongodb server.

}
module.exports=connect;
