const express = require('express');
const http = require('http');
const connection = require('./DB_connection');
const Post= require('./DatabaseSchemas/PostSchema')
const Reply= require('./DatabaseSchemas/ReplyComments')
const Like= require('./DatabaseSchemas/likesSchema')
const Comment= require('./DatabaseSchemas/CommentSchema')
const router = require('./Router_connector');
require('dotenv').config();
const cookies= require("cookie-parser")
const cors=require('cors')
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(cookies())
app.use(express.json());
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const initializeSocket = require('./WebSockets/Socket');
app.use(cors({
  origin:["http://localhost:3000"],
  credentials: true,
  methods:["POST,GET,PUT,DELETE"],
  allowedHeaders: ['Content-Type']
}))
app.use("/",router)
let server

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died ,${worker.length}`);
      // Optionally restart the worker
      cluster.fork();
  });

} else{
   server = http.createServer(app);
   initializeSocket(server);
}



  

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

