
const {Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment");
const User= require("../DatabaseSchemas/userSchema")



function Tracking(Socket,orderListNamespace,notificationsNamespace,users){
    console.log("Tracking route connected");

    Socket.on("createOrder", async(data) => { //receiving createOrders data from clientside
        console.log(data)
     
        try {
            //Inserting new data received from clientside in to orders table

            const order = new Order({customer_id:data.Id, items:data.items,origin:data.origin, destination:data.destination,totalAmount: data.length });// creating new order

            await order.save();  // saving new order the database
            const user= await User.findById(data.Id) //select _id from the Users table where _id=data.id

             const sendOrder = {
                _id: order._id,
                customer_id: order.customer_id,
                customerName:user.username,
                Status: order.Status, 
            };
            
            
            Socket.emit("receive",sendOrder) //send this data the user connected to this namespace
            orderListNamespace.in("orderRoom").emit("receivedOrder", sendOrder); // Emit to all in "/order" room
                orderListNamespace.in("orderRoom").emit("receiveOneOrder", sendOrder);
            
        }catch(err) {
            console.error("Error saving order or emitting event:", err);
        }
});

    Socket.on("allOrders",async(id)=>{
        try{
            //find all Orders with this particular customer's id
             const orders= await Order.find({customer_id:id}) 
            
             Socket.emit("getOrders",orders) // sending orders of all user to myself
        }catch(error){
          console.log(error)
        }
  })

  Socket.on("deleteOrder",async(data)=>{ // deleting order
    try{
        console.log(data)
       await Order.findByIdAndDelete(data.order_id)  // find the order by the id and delele it
       Socket.emit("orderDeleted",data.order_id)
       // Check if the users object and the specific customer_id exist
    
        // Emit the event to the specific user
        orderListNamespace.to("orderRoom").emit("Deleted", data.order_id);
    
    }catch(error){
        console.log(error)
    }
})
  
    // Log the users currently in the /order room for debugging
    
    Socket.on('disconnect', () => {
        console.log('User disconnected from the tracking namespace');
    });

    return Socket  //return Socket where ever the tracking function is called
}

module.exports= Tracking  //exporting the tracking function