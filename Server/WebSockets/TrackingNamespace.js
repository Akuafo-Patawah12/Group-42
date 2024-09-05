
const {Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment");



function Tracking(Socket,orderListNamespace,notificationsNamespace,users){
    console.log("Tracking route connected");

    Socket.on("createOrder", async(data) => {
        
     
        try {
            const order = new Order({customer_id:data.Id, items: data, totalAmount: data.length });
            await order.save();
  
             const sendOrder = {
                _id: order._id,
                Status: order.Status, 
            };
            
            
            Socket.emit("receive",sendOrder)
            orderListNamespace.in("orderRoom").emit("receivedOrder", sendOrder); // Emit to all in "/order" room
            
        } catch (err) {
            console.error("Error saving order or emitting event:", err);
        }
        
            
    });
    Socket.on("allOrders",async(id)=>{
        try{
             const orders= await Order.find({customer_id:id})
            
             Socket.emit("getOrders",orders)
        }catch(error){
          console.log(error)
        }
  })
  
    // Log the users currently in the /order room for debugging
    
    Socket.on('disconnect', () => {
        console.log('User disconnected from the tracking namespace');
    });

    return Socket
}

module.exports= Tracking