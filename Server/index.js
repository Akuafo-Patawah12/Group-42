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
  credentials: true
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


app.post("/login", async(req,res)=>{
  const {email,password }= req.body.formData
  try{
      const email_Exist= await data.findOne({email:email}); //finding email from the database

      let Encrypted_Password= email_Exist.password

       const password_Is_Correct= await bcrypt.compare(password, Encrypted_Password);

       const protected= email_Exist.account_type

       const token= jwt.sign({id: email_Exist._id}, process.env.REFRESH_TOKEN_SECRET,{
          expiresIn: '6d',   
      })
      if(email_Exist){ //checking if the email the user login with exist in the database
          if(password_Is_Correct && protected==="Personal" ){
              // Set the refresh token as a cookie and send it to the browser after login
                 res.cookie('refreshToken', token, {
                      httpOnly: true,   // Ensures that the cookie is only accessible via HTTP(S) requests
                      path: '/',        // Specifies the path for which the cookie is valid
                      secure: true,          // Indicates that the cookie should only be sent over HTTPS
                      sameSite: 'none',      // Specifies same-site cookie attribute to prevent cross-site request forgery
                      maxAge: 7 * 24 * 60 * 60 * 1000    // Sets the expiration time of the cookie (7 days in milliseconds)
                 });   
                  res.json('Logged in as an individual'); //send a response from server to client if email & password exist 
          }else if(password_Is_Correct && protected==="Business"){
              res.cookie('refreshToken',token ,{ //Sending refresh cookies to the browser after login
                  httpOnly:true,
                  path:'/',
                  secure:false,
                  sameSite: 'none',
                  maxAge: 7 * 24 * 60 * 60 * 1000
              });  
                  res.json("Logged in as a company")
          }else if(!password_Is_Correct){
              res.json('invalid password'); 
          }
      }else{
          res.json("invalid email")
      }
  }catch(err){
     res.status(404).json(err) //Console 404 error message if server crashes
  }
})

io.on('connect',(socket) => {
  
 console.log("connected 😊")
  socket.on('sendPost', async(post) => {
    try{
    // Broadcast the message to all clients
    console.log(post)
    let fake_DB;
    fake_DB=post
    console.log(fake_DB)
    io.emit('receivePost',post);
  }catch(err){
    console.log(err)
  }
    
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('reconnect_attempt', (attempt) => {
    console.log(`Reconnection attempt ${attempt}`);
  });
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

