
const {Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")


function Tracking(Socket,orderListNamespace){
    console.log("Tracking route connected");

    Socket.on("createOrder", async(data) => {
        console.log("Order data received:", data);
     
        try {
            const order = new Order({ items: data, totalAmount: data.length });
            await order.save();
  
             const sendOrder = {
                id: order._id,
                status: order.Status, 
            };
  
            
            Socket.emit("receive",sendOrder)
            orderListNamespace.in("orderRoom").emit("receivedOrder", sendOrder); // Emit to all in "/order" room
            console.log("Order emitted to /order room:", sendOrder);
        } catch (err) {
            console.error("Error saving order or emitting event:", err);
        }
        
            
    });
  
    // Log the users currently in the /order room for debugging
    
    Socket.on('disconnect', () => {
        console.log('User disconnected from the tracking namespace');
    });

    return Socket
}

module.exports= Tracking