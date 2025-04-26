
const notification = require("../Models/Notification")
const { Order,Shipment } = require("../Models/OrderAndShipment")
const data= require("../Models/userSchema")
const  orderList=(Socket,notificationsNamespace,orderListNamespace,trackingNamespace,Users)=>{
     
    console.log("connected to orderList")
    Socket.on("joinRoom",async(info)=>{
        
           Socket.join("orderRoom")  //When client joins orderlist namespace he/she automatically joins the room
           Socket.to("orderRoom").emit("joined","hello i joind order room")  /*sending message to all users in the room */
         
    })
    Socket.on("clientOrders", async (id) => {
      try {
        const orders = await Order.aggregate([
          // Join with users collection
          {
            $lookup: {
              from: 'users',
              localField: 'customer_id',
              foreignField: '_id',
              as: 'userDetails'
            }
          },
          {
            $unwind: '$userDetails'
          },
    
          // Join with shipments collection (optional)
          {
            $lookup: {
              from: 'shipments',           // The name of your shipments collection
              localField: 'shipmentId',    // Field in Order
              foreignField: '_id',         // Field in Shipment
              as: 'shipmentDetails'
            }
          },
    
          // Optional: flatten shipmentDetails if you only expect one
          {
            $unwind: {
              path: '$shipmentDetails',
              preserveNullAndEmptyArrays: true // So that it doesn't remove orders without a shipment
            }
          },
    
          // Final projection
          {
            $project: {
              _id: 1,
              customer_id: 1,
              Status: 1,
              cbm: 1,
              qty: 1,
              createdAt: 1,
              customerName: '$userDetails.username',
              containerNumber: '$shipmentDetails.containerNumber', // example field
              route:  '$shipmentDetails.route',         // example field
              port : '$shipmentDetails.port',
              eta: '$shipmentDetails.eta',

              containerNumber: '$shipmentDetails.containerNumber',
              cbmRate: '$shipmentDetails.cbmRate',
              shipmentDate: '$shipmentDetails.createdAt',          // example field
            }
          }
        ]).sort({ createdAt: -1 });
    
        Socket.emit("getAllOrders", orders);
      } catch (error) {
        console.log("Client order's error", error);
      }
    });
    
    Socket.on("deleteOrder",async(data,callback)=>{
        try{
            console.log(data)
           const deleted = await Order.findByIdAndDelete(data.orderId)  // find the order by the id and delele it
           console.log(deleted)
           if (!deleted){
            callback({status:"error", error:"Failed to delete shipment"})
            return
           }
           orderListNamespace.in("adminRoom").emit("orderDeleted",data.orderId)
           Socket.emit("orderDeleted",data.orderId)
           // Check if the users object and the specific customer_id exist
        if (Users ) {
            console.log("Customer's socket ID: ", Users[data.customer_id]);

            // Emit the event to the specific user
            trackingNamespace.to(Users[data.customer_id]).emit("Deleted", data.order_id);
        } else {
            console.log(`No socket found for customer ID: ${data.customer_id} and ${Users}`);
        }
        }catch(error){
            console.log(error)
            callback({status:"error", error:"Failed to delete shipment"})
        }
    })

    Socket.on("getUserOrder",async(data)=>{
        try{
            const orders=await Order.find({customer_id:data})
           Socket.emit("sendUserOrder",orders)
        }catch(error){
            console.log(error)
        }
    })
    
    Socket.on('disconnect', () => {  
     console.log('User disconnected from the tracking namespace');
 });

 Socket.on("start-shipment", async ({ containerNumber, selectedRowKeys }, callback) => {
  try {
    console.log(containerNumber, selectedRowKeys)
    const shipments = await Shipment.findOne({containerNumber});
      if (!shipments) {
        return callback( {status:"error", message: "Container not found" });
      } 
      if (!Array.isArray(selectedRowKeys)) {
        console.log("Invalid order IDs")
        return callback({ status: "error", message: "Invalid order IDs" });
      }
  
      
    // Update the orders in the database
    await Order.updateMany(
  { _id: { $in: selectedRowKeys } },
  { $set: { shipmentId:shipments._id, Status: "in-Transit" } }
);


const updatedOrders = await Order.find({ _id: { $in: selectedRowKeys } });
if(!updatedOrders){
  console.log("no orders found")
}
updatedOrders.forEach((order) => {
  shipments.assignedOrders.push({
    orderId: order._id,
    userId: order.customer_id,
  });
});

await shipments.save();

updatedOrders.forEach((order) => {
    const recipientSocketId = Users[order.customer_id]; // Fetch user’s socket ID
    const notify = new notification({
      userId: order.customer_id,
      message: "Your shipment has started",
    });

    notify
    .save()
    .then(() => console.log("Notification saved"))
    .catch((err) => console.log("Failed to save notification", err));

    if (recipientSocketId) {
      console.log("socketid",recipientSocketId)

      notificationsNamespace.to(recipientSocketId).emit("notify", {
        id: containerNumber,
        message: "Your shipment has started",
        read: false,
      });
      Socket.to(recipientSocketId).emit("assignedToContainer", { containerNumber, updatedOrders });
    }
  });

    
    // Optional: Emit to others or log something
    console.log(`Shipment started for container: ${containerNumber}`);
    
    Socket.emit("usersAssigned", { message: "Users successfully assigned!", containerNumber });
  } catch (error) {
    console.error("Error starting shipment:", error);
    callback({ status: "error" });
  }
});

Socket.on("addCBM/CTN",async(data,callback)=>{
  try{
    console.log(data)
    const order= await Order.findById(data.order_id)
    if (!order) return callback({status:"error",data:"Order does not exist"})
    order.cbm=data.cbm;
    order.qty=data.qty;
    await order.save()
    
    
    Socket.to(Users[data.userId]).emit("update_CBM/CTN",order)
    callback({status:"ok",data: order})
  }catch(err){
    console.log(err)
  }
})


Socket.on("disconnect", () => {
  console.log("User disconnected from the orderList namespace");
  // Remove the user from the Users object
  for (const [userId, socketId] of Object.entries(Users)) {
    if (socketId === Socket.id) {
      delete Users[userId];
      break;
    }
  }
})

 return Socket;
}

module.exports= orderList