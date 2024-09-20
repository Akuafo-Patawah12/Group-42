const user= require("../DatabaseSchemas/userSchema")


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
   socket.on("disconnect",()=>{
      console.log("disconnected from user's namespace")
   })

    return socket
}

module.exports= userFunc