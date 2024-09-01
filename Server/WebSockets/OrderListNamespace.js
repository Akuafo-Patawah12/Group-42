
const data= require("../DatabaseSchemas/userSchema")
const  orderList=(Socket)=>{
    console.log("connected to orderList")
    Socket.on("joinRoom",async(info)=>{
     console.log(Socket)
    try {
     const userIds = await data.findOne({_id:info.id });

         
           Socket.join("orderRoom")  //When client joins orderlist namespace he/she automatically joins the room
           Socket.to("orderRoom").emit("joined","hello i joind order room")  /*sending message to all users in the room */
         

 } catch (err) {
     console.error("Error finding users or joining room:", err);
 }
    })
    Socket.on('disconnect', () => {
     console.log('User disconnected from the tracking namespace');
 });

 return Socket
}

module.exports= orderList