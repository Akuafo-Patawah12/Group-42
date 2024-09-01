const socketIo = require('socket.io');
const Post= require('../DatabaseSchemas/PostSchema')
const Like= require('../DatabaseSchemas/likesSchema')

 const data= require("../DatabaseSchemas/userSchema")
const jwt= require('jsonwebtoken')
const cookie= require('cookie');
const orderList = require('./OrderListNamespace');
const Tracking = require('./TrackingNamespace');
const PostFunction = require('./PostOrMainNamespace');


function initializeSocket(server) {   
const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
    cors: {
      origin:"http://localhost:3000",
      methods: ['GET','POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });
   
  
  io.use((socket, next) => {
    const cookieHeader = socket.request.headers.cookie; //getting http only cookies from socket
    
    if (!cookieHeader) {  //checking of the cookie exist in the headers
      
      return next(new Error('No cookies found'));
    }
  
    if (cookieHeader) {
      const cookies = cookie.parse(cookieHeader); // Parse cookies from the header
      const token = cookies.refreshToken; // Extract the refresh token
      if (!token) return next(new Error('Refresh token expired'));

       //decoding the token to extract user information
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
        if (err) return next(new Error("Token can't be decoded error"));
        socket.user = user; // Attach user to the socket
        next(); //proceed if there's no error
      });
    } else {
      next(new Error('Authentication error'));
    }
  });
  
  const users={}  // Object to store online users socket ID

  // List of namespace or path in socket.io
  const orderListNamespace=  io.of("/orderList")
  const notificationsNamespace = io.of('/notify');
  const trackingNamespace =    io.of('/Tracking');
  io.on('connection', (socket) => {  //
      PostFunction(socket,users,io,notificationsNamespace)

 socket.on("like",async(data)=>{
     const{user_id,post_id}= data;
     try{
       const like= new Like({
         user_id,
         post_id
       })
       await like.save()   

       const likesCount= await Like.countDocuments({post_id})
       console.log(likesCount)
       io.emit("getLikes", {
         postId: post_id,
         like_count: likesCount,
     })
     }catch(err){
       console.log("likes error",err)
     }

 })
 

 socket.on('disconnect', () => {
   console.log('user disconnected');
 });
});

notificationsNamespace.on('connection', (socket) => {
  console.log('A user connected to the notifications namespace');


  socket.on('disconnect', () => {
      console.log('User disconnected from the notifications namespace');
  });
});

trackingNamespace.on("connection", async (socket) => {
    Tracking(socket)
});

orderListNamespace.on("connection",(socket)=>{
      orderList(socket)
})

io.of("/like").on("connection", (socket) => {
  socket.on("dislike",async(data)=>{
    const{user_id,post_id}= data;
    try{
       await Like.findOneAndDelete({post_id})
      const likesCount= await Like.countDocuments({post_id})
 
      io.emit("getDislike",{
        postId: post_id,
        like_count: likesCount,
        user_id
    })
    }catch(err){
      console.log("likes error",err)
    }
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
 
 })
});
return io;
}

module.exports= initializeSocket;