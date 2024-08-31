const socketIo = require('socket.io');
const Post= require('./DatabaseSchemas/PostSchema')
const Reply= require('./DatabaseSchemas/ReplyComments')
const Like= require('./DatabaseSchemas/likesSchema')
const Comment= require('./DatabaseSchemas/CommentSchema')
 const data= require("./DatabaseSchemas/userSchema")
 
 const {Order,Shipment}= require("./DatabaseSchemas/SupplyChain_Model/OrderAndShipment")
const jwt= require('jsonwebtoken')
const cookie= require('cookie')
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
    
    if (!cookieHeader) {
      
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


  const orderListNamespace=io.of("/orderList")
  const notificationsNamespace = io.of('/notify');
  const trackingNamespace = io.of('/Tracking');
  io.on('connection', (socket) => {  //
    const userId=socket.user.id  // Extracting users id from socket
    users[userId]=socket.id  //asigning the users id to the socket id and inserting into the users object
    console.log(users)
    
    console.log("Connected to server")
 socket.on('sendPost', async (data) => { //socket.on means receiving data or information from client side
   const { id,caption,img_vid } = data; //get post from client side
   try {
     // Create a new post and save it to the database
     const input = new Post({
       caption,
       img_vid,
       user_id:id
     });
     await input.save(); //insert post into database 
     const post = await Post.findOne({ _id: input._id }).populate('user_id','username').lean();
     const data={
         _id: post._id,
         user_id: post.user_id._id,
         caption,
         img_vid,
         createdAt: post.createdAt,
         username: post.user_id.username
     }
       io.emit('receivePost', data);
       const notificationData = {
        _id: post._id,
        message: `${post.user_id.username} created a post.`
    };
    notificationsNamespace.emit('notify', notificationData);


   } catch (err) {
     console.log(err, "sock error");
   }
 });

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
  console.log("Tracking route connected");


  

  socket.on("createOrder", async (data) => {
      console.log("Order data received:", data);
   
      try {
          const order = new Order({ items: data, totalAmount: data.length });
          await order.save();

           const sendOrder = {
              id: order._id,
              status: order.Status, 
          };

          orderListNamespace.to("/orderRoom").emit("receivedOrder", sendOrder); // Emit to all in "/order" room
          socket.emit("receive",sendOrder)
          console.log("Order emitted to /order room:", sendOrder);
      } catch (err) {
          console.error("Error saving order or emitting event:", err);
      }
      
          
  });

  // Log the users currently in the /order room for debugging
  
  socket.on('disconnect', () => {
      console.log('User disconnected from the tracking namespace');
  });
});

orderListNamespace.on("connection",(socket)=>{
     console.log("connected to orderList")
     socket.on("joinRoom",async(info)=>{
     try {
      const userIds = await data.findOne({_id:info.id });

          
          if (userIds.account_type==="Business") {
              const userSocket = io.sockets.sockets.get(`${userIds._id}`);
              if (userSocket) {
                  userSocket.join("/orderRoom"); // Add the user to the "/order" room
                  console.log(`User ${userIds._id} added to room /order`);
              } else {
                  console.log(`Socket not found for user ${userIds._id}`);
              }
          } else {
              console.log(`User ${userIds._id} is not connected`);
          }
      


      const roomSockets = io.sockets.adapter.rooms.get("/orderRoom");
  
  console.log("Users in /order room:", roomSockets ? [...roomSockets] : "No users");
  

  } catch (err) {
      console.error("Error finding users or joining room:", err);
  }
     })
     socket.on('disconnect', () => {
      console.log('User disconnected from the tracking namespace');
  });
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