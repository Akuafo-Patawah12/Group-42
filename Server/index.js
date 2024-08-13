const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connection = require('./DB_connection');
const Post= require('./DatabaseSchemas/PostSchema')
const Reply= require('./DatabaseSchemas/ReplyComments')
const Like= require('./DatabaseSchemas/likesSchema')
const Comment= require('./DatabaseSchemas/CommentSchema')
 const data= require("./DatabaseSchemas/userSchema")
const router = require('./Router_connector');
require('dotenv').config();
const cookies= require("cookie-parser")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const cors=require('cors')
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cookies())
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true,
  methods:["POST,GET,PUT,DELETE"],
  allowedHeaders: ['Content-Type']
}))
app.use("/",router)
const server = http.createServer(app);

const io = socketIo(server, {   //Creating connect between server and User Interface  "Realtime WebApp"
  cors: {
    origin:"http://localhost:3000",
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

    

io.on('connection', (socket) => {  // 
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
      const post = await Post.findOne({ _id: input._id }).populate('user_id','username');
        io.emit('receivePost', {
            _id: post._id,
            user_id: post.user_id._id,
            caption,
            img_vid,
            createdAt: post.createdAt,
            username: post.user_id.username
        });
        io.emit('notification', {
           _id: post._id,
           message: post.user_id.username+" "+"created a post."
        })


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

})
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.get('/emit-posts', async(req, res) => {
  try {
    const result = await Post.aggregate([  //joining an querying different tables
      { 
        $lookup: {
          from: 'users', // Name of the user collection
          localField: 'user_id', // Field in the posts collection
          foreignField: '_id', // Field in the users collection
          as: 'userDetails' // Alias for the joined documents
         }
      },
      {
        $unwind: '$userDetails' // Deconstruct the array of userDetails
      },
      
    
      {
        $project: {
          _id: 1, // Include the _id of the post
          user_id: 1, // Include the user_id
          caption: 1, // Include the caption
          img_vid: 1, // Include the img_vid
          createdAt: 1, //Include the createdAt
          username: '$userDetails.username' // Include the username from userDetails
        }
      }
    ]).sort({createdAt:-1});
    res.json(result)
  } catch (error) { 
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  } 
});

const PORT = process.env.PORT || 5000;  //grabbing the port number from .env file 

async function startServer(){
  try{
  //  await    //database connection
    await connection()  /*connection to database you can check DB_Connection file to have a 
    view of how the connection was created */
    server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`); });
    
  }catch(e){
    console.log("Server Crashed",e)    // when there's an error print Server Crashed
  }
}
startServer()  //this function execute if there's no error.

