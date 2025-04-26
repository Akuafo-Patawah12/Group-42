const user= require("../Models/userSchema")


const userFunc= (socket)=>{
   socket.on("getAllUsers",async(data)=>{
    try{
       const All_users= await user.find({})
       socket.emit("All_users",All_users)
    console.log(data)
    }catch(error){
        console.log(error)
    }
   })

   socket.on("joinRoom",async()=>{
        
      socket.join("userRoom")  //When client joins orderlist namespace he/she automatically joins the room
      socket.to("userRoom").emit("joined","hello i joind order room")  /*sending message to all users in the room */
    
})
   socket.on("disconnect",()=>{
      console.log("disconnected from user's namespace")
   })

    return socket
}

module.exports= userFunc