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
    methods: ['GET','POST',"PUT","DELETE"],
    allowedHeaders : ['Content-Type'],
    credentials: true
  }
});

    

io.on('connection', (socket) => {
  console.log("connected 😊");

  socket.on('sendPost', async (data) => {
    const { id, caption, img_vid } = data;
    try {
      // Create a new post and save it to the database
      const input = new Post({
        caption,
        img_vid,
        user_id: id
      });
      await input.save();

      

     
    } catch (err) {
      console.log(err, "sock error");
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

 
  



const PORT = process.env.PORT || 4000;

async function startServer(){
  try{
  //  await    //database connection
    await connection()
    server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`); });
    
  }catch(e){
    console.log("Server Crashed",e)    // when there's an error print Server Crashed
  }
}
startServer()

