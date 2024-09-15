const express = require('express');
const http = require('http');
const connection = require('./DB_connection');
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
app.use("/",router)  //A middleware the return all api for authentication
let server //creating a server instance

if (cluster.isMaster) { //Load balancing
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) { // dividing the cpu cores and restart the server
      cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => { //when a cpu worker dies restart the server
      console.log(`Worker ${worker.process.pid} died ,${worker.length}`);
      // Optionally restart the worker
      cluster.fork();
  });

} else{
   server = http.createServer(app);  
   initializeSocket(server);  //this function returns socket from the Socket file
}



  



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

