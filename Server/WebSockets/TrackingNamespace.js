
const notificationModel = require("../Models/Notification");
const {Order, Shipment}= require("../Models/OrderAndShipment");
const User= require("../Models/userSchema")



function Tracking(Socket,orderListNamespace,notificationsNamespace,users){
    console.log("Tracking route connected");

    Socket.on("createOrder", async(data) => { //receiving createOrders data from clientside
        console.log(data)
     
        try {
            //Inserting new data received from clientside in to orders table

            const order = new Order({customer_id:data.Id, description:data.items,location:data.location, tracking_no:data.tracking_id ,suppliersNumber:parseInt(data.suppliersNumber) });// creating new order

            await order.save();  // saving new order the database
            const customer= await User.findById(order.customer_id) //select _id from the Users table where _id=data.id

             const sendOrder = {
                _id: order._id,
                customer_id: order.customer_id,
                customerName:customer.username,
                Status: order.Status,
                createdAt: order.createdAt,
                tracking_no: order.tracking_no, 
                description: order.description,
            };
            
            const admin = await User.find({account_type:"Business"})
            admin.forEach(async(user)=>{
                
                try{
                    
                const notification = new notificationModel({
                    userId: user._id,
                    message: `${customer.username} requested a quote`,
                    read: false
                })
                await notification.save()
                const socket_id= users[user._id]
                    console.log("socket",socket_id)
                if(socket_id){
                    notificationsNamespace.to(socket_id).emit("notify",notification)
                    console.log(users)
                }
            }catch(err){
                console.log(err)
            }
                
            })

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
            const orders = await Order.find({ customer_id: id })
            .populate('customer_id','fullname')         // Replace with actual field name referencing User
            .populate('shipmentId','eta loadingDate route port cbmRate ');
            
             Socket.emit("getOrders",orders) // sending orders of all user to myself
        }catch(error){
          console.log(error)
        }
  })

  Socket.on("deleteOrder",async(data,callback)=>{ // deleting order
    try{
        console.log(data)
       const order = await Order.findById(data.order_id)  // find the order by the id and delele it
       console.log(order)
       if(!order){
        callback({status:"error",message:"failed to delete"})
        return
       }
       if(order.Status==="in-Transit"){
        callback({status:"error",message:"Shipments in transit cannot be deleted"})
        return
       }
       
       await Order.findByIdAndDelete(data.order_id) 
       
       Socket.emit("orderDeleted",data.order_id)
       // Check if the users object and the specific customer_id exist
    
        // Emit the event to the specific user
        orderListNamespace.in("orderRoom").emit("Deleted", data.order_id);
    
    }catch(error){
        console.log(error)
        callback({status:"error",message:"Oops, something when wrong, try again later"})
    }
})

Socket.on("track",async(data,callback)=>{
   
    try{
      console.log(data)
      const order= await Order.findOne({tracking_no: data}).populate("shipmentId","port route")
      console.log(order)
      if(!order){
         callback({status: "error", message:"Your tracking id is not associated with any order"})
      }
      if (!order.shipmentId) {
        callback({status: "error", message:"Shipment is still pending"})
      }
      
      console.log(order)
      callback({status:"ok",message:"Tracking"})
      Socket.emit("get_item_location",order)
      
    }catch(error){
        console.log(error)
    }
   })
  
    // Log the users currently in the /order room for debugging
    
    Socket.on('disconnect', () => {
        for (const [userId, socketId] of Object.entries(users)) {
            if (socketId === Socket.id) {
                delete users[userId];
                break;
            }
        }
        console.log('User disconnected from the tracking namespace');
    });

    return Socket  //return Socket where ever the tracking function is called
}

module.exports= Tracking  //exporting the tracking function