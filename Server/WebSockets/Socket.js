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
const shipping= require("./ShippmentNamespace")


function initializeSocket(server) {   
const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
    cors: {
      origin:"http://localhost:3000",
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
        if (err) return next(new Error("Token can't be decoded error"));
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
  
  io.on('connection', (socket) => {  //
      setUser(socket)
      
      PostFunction(socket,users,io,notificationsNamespace)

 
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
   const Users={}
trackingNamespace.on("connection", async (socket) => {
  const userId=socket.user.id  // Extracting users id from socket
  Users[userId]=socket.id 

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