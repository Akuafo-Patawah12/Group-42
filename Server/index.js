const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connection = require('./DB_connection');
const router = require('./Router_connector');
require('dotenv').config();
const cookies= require("cookie-parser")
const cors=require('cors')
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookies())
app.use(cors())
app.use("/",router)
const server = http.createServer(app);

const io = socketIo(server, {   //Creating connect between server and User Interface
  cors: {
    origin:["*"],
    methods: ['GET','POST',"PUT","DELETE"],
    //allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

const PORT = process.env.PORT || 4000;

async function startServer(){
  try{
    await connection()   //database connection
    server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`); });
    
  }catch(e){
    console.log("Server Crashed",e)    // when there's an error print Server Crashed
  }
}
startServer()

