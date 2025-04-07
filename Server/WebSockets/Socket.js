const socketIo = require('socket.io');
const Post= require('../DatabaseSchemas/PostSchema')
const {Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")
 const data= require("../DatabaseSchemas/userSchema")
 const Message=  require("./MessageNamespace")
const jwt= require('jsonwebtoken')
const cookie= require('cookie');
const orderList = require('./OrderListNamespace');
const Tracking = require('./TrackingNamespace');
const PostFunction = require('./PostOrMainNamespace');
const shipping= require("./ShippmentNamespace");
const userFunc = require('./UsersNamespace');


function initializeSocket(server) {   
const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
    cors: {
      origin:"http://localhost:3001",
      methods: ['GET','POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    }
  });
  
  
  const orderListNamespace=  io.of("/orderList")
  const notificationsNamespace = io.of('/notify');
  const trackingNamespace =    io.of('/Tracking');
  const shippingNameSpace= io.of("/Shipping")
  const messageNamespace= io.of("/message")
  const usersNamespace= io.of("/users")


  function middleware(socket,next){
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
        if (err) return next(new Error("Token can't be decoded"));
        socket.user = user; // Attach user to the socket
        next(); //proceed if there's no error
      });
    } else {
      next(new Error('Authentication error'));
    }
  }
  io.use((socket, next) => {
      middleware(socket,next)
  });

  usersNamespace.use((socket,next) =>{
    middleware(socket,next)
  })

  notificationsNamespace.use((socket,next)=>{
      middleware(socket,next)
  })

  orderListNamespace.use((socket,next)=>{
    middleware(socket,next)
})

trackingNamespace.use((socket,next)=>{
  middleware(socket,next)
})
  
  const users={}  // Object to store online users socket ID
  
  function setUser(socket){
    const userId=socket.user.id  // Extracting users id from socket
    users[userId]=socket.id 
  }
  // List of namespace or path in socket.io


const onlineUsers = {}; // Store online users with socket IDs
const lastActiveTimestamps = {}; // Store last active timestamps
  
  io.on('connection', (socket) => {  //
      setUser(socket)
      
      PostFunction(socket,users,io,notificationsNamespace)

      // User logs in or joins
  socket.on("userOnline", (userId) => {
    onlineUsers[userId] = socket.id; // Map userId to socket.id
    console.log(`User ${userId} is now online.`);
    console.log(onlineUsers)

    usersNamespace.in("userRoom").emit("Active",{user_id: socket.id})
  });

  // User disconnects
  socket.on("disconnect", () => {
    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (userId) {
      delete onlineUsers[userId]; // Remove from online list
      lastActiveTimestamps[userId] = new Date(); // Save last active timestamp
      console.log(`User ${userId} disconnected. Last active: ${lastActiveTimestamps[userId]}`);
      console.log("Generated Timestamp:", new Date().toISOString());
    }
  });

  // Provide online status
  socket.on("checkStatus", (userId, callback) => {
    const isOnline = Boolean(onlineUsers[userId]);
    const lastActive = lastActiveTimestamps[userId] || null;
    callback({ isOnline, lastActive });
  });

 
 socket.on('disconnect', () => {
  
   console.log('user disconnected');
 });
});

usersNamespace.on("connection",(socket,callBack)=>{
    console.log("connected to usersNamespace")
    userFunc(socket,callBack)
})

notificationsNamespace.on('connection', (socket) => {
  
  console.log('A user connected to the notifications namespace');


  socket.on('disconnect', () => {
    
      console.log('User disconnected from the notifications namespace');
  });
});
   const Users={}
trackingNamespace.on("connection", async (socket) => {
  const userId=socket.user.id  // Extracting users id from socket
  Users[userId]=socket.id 
  console.log(Users)

    Tracking(socket,orderListNamespace,notificationsNamespace,Users)
});

orderListNamespace.on("connection",(socket)=>{

    orderList(socket,orderListNamespace,trackingNamespace,Users)
})

shippingNameSpace.on("connection",(socket)=>{
    shipping(socket,trackingNamespace,orderListNamespace,Users)
    console.log(users)
})


messageNamespace.on("connection",async(socket)=>{
  console.log("connected to message namespace")
   Message(socket)

})

return io;
}

module.exports= initializeSocket;