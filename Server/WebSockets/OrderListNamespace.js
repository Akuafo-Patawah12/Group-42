
const { Order } = require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")
const data= require("../DatabaseSchemas/userSchema")
const  orderList=(Socket,orderListNamespace)=>{
    console.log("connected to orderList")
    Socket.on("joinRoom",async(info)=>{
         
           Socket.join("orderRoom")  //When client joins orderlist namespace he/she automatically joins the room
           Socket.to("orderRoom").emit("joined","hello i joind order room")  /*sending message to all users in the room */
         
    })
    Socket.on("clientOrders",async(id)=>{
          try{
               const orders= await Order.find({}).sort({createdAt:-1})
               Socket.emit("getAllOrders",orders)
          }catch(error){
            console.log(error)
          }
    })
    Socket.on("deleteOrder",async({data,client_id})=>{
        try{
           await Order.findByIdAndDelete(data)
           orderListNamespace.emit("orderDeleted",data)
           trackingNamespace.to(client_id).emit("orderDeleted",{id:data,client_id:client_id})
        }catch(error){
            console.log(error)
        }
    })
    
    Socket.on('disconnect', () => {  
     console.log('User disconnected from the tracking namespace');
 });

 return Socket;
}

module.exports= orderList