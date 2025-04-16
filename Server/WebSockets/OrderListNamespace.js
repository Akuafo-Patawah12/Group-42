
const { Order,Shipment } = require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")
const data= require("../DatabaseSchemas/userSchema")
const  orderList=(Socket,orderListNamespace,trackingNamespace,Users)=>{
     
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
              createdAt: 1,
              customerName: '$userDetails.username',
              containerNumber: '$shipmentDetails.containerNumber', // example field
              route:  '$shipmentDetails.route',         // example field
              port : '$shipmentDetails.port',
              eta: '$shipmentDetails.eta',
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
    
    Socket.on("deleteOrder",async(data)=>{
        try{
            console.log(data)
           await Order.findByIdAndDelete(data.order_id)  // find the order by the id and delele it
           orderListNamespace.emit("orderDeleted",data.order_id)
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
    const recipientSocketId = Users[order.userId]; // Fetch user’s socket ID
    if (recipientSocketId) {
      Socket.to(recipientSocketId).emit("assignedToContainer", { containerId, updatedOrders });
    }
  });

    
    // Optional: Emit to others or log something
    console.log(`Shipment started for container: ${containerNumber}`);
    
    Socket.emit("usersAssigned", { message: "Users successfully assigned!", container });
  } catch (error) {
    console.error("Error starting shipment:", error);
    callback({ status: "error" });
  }
});

 return Socket;
}

module.exports= orderList