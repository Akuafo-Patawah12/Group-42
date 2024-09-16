
const Message=(socket)=>{

socket.on("sendMessage",async(data)=>{
    try{
       console.log(data)
       socket.to().emit("receivedMessage",data)
    }catch(error){
        console.log(error)
    }
})
socket.on("disconnect",()=>{
    console.log("user disconnected from Message namespace")
})

return socket
}


module.exports= Message

