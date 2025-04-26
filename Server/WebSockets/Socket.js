const socketIo = require('socket.io');

 const Message=  require("./NotificationsNamespace")
const jwt= require('jsonwebtoken')
const cookie= require('cookie');
const util= require("util")
const orderList = require('./OrderListNamespace');
const Tracking = require('./TrackingNamespace');
const PostFunction = require('./PostOrMainNamespace');
const shipping= require("./ShippmentNamespace");
const userFunc = require('./UsersNamespace');
const notify = require("./NotificationsNamespace")
const { resolve } = require("path");


function initializeSocket(server) {   
const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
    cors: {
      origin:["http://localhost:5173","http://localhost:5174"],
      methods: ['GET','POST'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    },
    autoConnect: true,
    
  });
  
  
  const orderListNamespace=  io.of("/orderList")
  const notificationsNamespace = io.of('/notify');
  const trackingNamespace =    io.of('/Tracking');
  const shippingNameSpace= io.of("/Shipping")
  const messageNamespace= io.of("/message")
  const usersNamespace= io.of("/users")

  
              
         
            
         

  const verifyToken = util.promisify(jwt.verify);

  async function middleware(socket, next) {
    try {
      const cookieHeader = socket.request.headers.cookie;
  
  
      if (!cookieHeader) {
        return next(new Error("Refresh token expired"));
      }
  
      const cookies = cookie.parse(cookieHeader);
      const token = cookies.refreshToken;
  
      if (!token) {
        return next(new Error("Refresh token expired"));
      }
  
      const user = await verifyToken(token, process.env.REFRESH_TOKEN_SECRET).catch((err) => {
        console.error("JWT Verification Error:", err.message);
        throw new Error("Refresh token expired");
      });
  
      
      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket Middleware Error:", err.message);
      return next(new Error("Refresh token expired")); // This triggers connect_error on client
    }
  }
  


  io.use(middleware)

  usersNamespace.use(middleware)

  notificationsNamespace.use(middleware)

  orderListNamespace.use(middleware)
    
  shippingNameSpace.use(middleware)

trackingNamespace.use(middleware)
  
  const users={}  // Object to store online users socket ID
  
  function setUser(socket){
    const userId=socket.user.id  // Extracting users id from socket
    users[userId]=socket.id 
  }
  // List of namespace or path in socket.io
  

const onlineUsers = {}; // Store online users with socket IDs
const lastActiveTimestamps = {}; // Store last active timestamps
const Users={}

  io.on('connection', (socket) => {  //
    try{
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
    console.log('user disconnected from defaultnamespace');
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

} catch (err) {
  console.error("Error during socket setup:", err);
}
 
});

usersNamespace.on("connection",(socket,callBack)=>{
    console.log("connected to usersNamespace")
    userFunc(socket,callBack)
    
})

notificationsNamespace.on('connection', (socket) => {
  const userId=socket.user.id  // Extracting users id from socket
  Users[userId]=socket.id 
  
  console.log('A user connected to the notifications namespace');
  notify(socket)
 
  socket.on('disconnect', () => {
    console.log('User disconnected from the notifications namespace');
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
          delete users[userId];
          break;
      }
  }
      
  });
});
   
trackingNamespace.on("connection", async (socket) => {
  const userId=socket.user.id  // Extracting users id from socket
  Users[userId]=socket.id 
  console.log(Users)
 
    Tracking(socket,orderListNamespace,notificationsNamespace,Users)
});

orderListNamespace.on("connection",(socket)=>{
  const userId=socket.user.id  // Extracting users id from socket
  Users[userId]=socket.id 
  
    orderList(socket,notificationsNamespace,orderListNamespace,trackingNamespace,Users)
})

shippingNameSpace.on("connection",(socket)=>{
    const userId=socket.user.id  // Extracting users id from socket
    Users[userId]=socket.id 
    shipping(socket,notificationsNamespace,trackingNamespace,orderListNamespace,Users)
      
})


messageNamespace.on("connection",async(socket)=>{
  console.log("connected to message namespace")
   Message(socket)
   
})

return io;
}

module.exports= initializeSocket;