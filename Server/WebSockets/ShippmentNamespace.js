const notification = require("../Models/Notification")
const {Shipment,Order}= require("../Models/OrderAndShipment")
const User = require("../Models/userSchema")

const shipping= async(Socket,notificationsNamespace,trackingNamespace,orderListNamespace,Users)=>{
   
      Socket.on("StartShippment",async(data)=>{
        try{
            console.log(data)
            const Id=data.Tracking_id.replace(/\t/g, '')  //removing whitespace from the id
            const order= await Order.findByIdAndUpdate({_id:Id},{Status:data.status},{new:true})
            

            const  Items=order.items
            function Idsfunc(){
              return Items.map((item) => item._id);  
            }

          const product= order.items
            const  shipment= new Shipment({
                order_id: data.Tracking_id,
                shippmentDate: data.shippingDate,
                
                item_ids: Idsfunc(),
                origin:order.origin,
                destination: order.destination,
                status: data.status
            })

             console.log(order)
            
            await shipment.save()

            orderListNamespace.emit("SendShippment",{shipment,product})
            Socket.emit("SendShippment",shipment)
            trackingNamespace.to(Users[order.customer_id]).emit("StatusUpdate", shipment);
        }catch(error){
            console.log(error)
        }
      })

      Socket.on("allShipment",async()=>{
          try{
            // Step 1: Find all shipments
         const allshipping = await Shipment.find({});

          // Step 2: Extract all item IDs from the shipments
          function Idsfunc() {
            return allshipping.flatMap((item) => {
              // Flatten the item_ids array
              return item.item_ids.map((Ids) => Ids);  // No need for ._id since item_ids already contains ObjectId
            });
          }
             
              // Step 3: Use the extracted item IDs to find items in the Order collection
              const items = await Order.find({ 'items._id': { $in: Idsfunc() } });

          // Step 4: Combine the data, adding `items` to each shipment
          const shipmentsWithItems = allshipping.map(shipment => {
            // Filter related orders that contain matching items
            const relatedItems = items.filter(order => 
              order.items.some(item => shipment.item_ids.includes(item._id))
            );

            // Flatten the items array from related orders
            const shipmentItems = relatedItems.flatMap(order => order.items);
            
            return {
              ...shipment._doc,  // Include all original shipment fields
              items: shipmentItems // Add matched items from Order collection
            };
          });

          // Optionally send the result to the client



          console.log(shipmentsWithItems);




             Socket.emit("getAllShipment", {shipmentsWithItems})
          }catch(error){
            console.log(error)
          }
      })


      Socket.on("createContainer", async (data, callback) => {
        try {
          const {  containerNumber,loadingDate, status, port, country, route, eta, cbmRate } = data;
          console.log({  containerNumber,loadingDate, status, port, route, eta, cbmRate });
      
          if ( !containerNumber || !containerNumber || !loadingDate || !status || !port || !route || !eta || !cbmRate) {
            return callback({ status: "error", message: "All fields are required." });
          }
      
          // Corrected check: Use findOne() instead of find()
          const existingContainer = await Shipment.findOne({ containerNumber });
      
          if (existingContainer) {
            return callback({ status: "error", message: "Container number is already in use" });
          }
      
          const newContainer = new Shipment({
            
            containerNumber,
            loadingDate,
            status,
            port,
            country,
            route,
            cbmRate,
            eta,
          });
      
          await newContainer.save();
      
          // Acknowledge success to the sender
          callback({ status: "ok", message: "Container added" });
      
          // Emit event to all connected users
          Socket.emit("newContainerAdded", newContainer);
          orderListNamespace.in("adminRoom").emit("newContainerAdded", newContainer);
      
        } catch (error) {
          console.error("Error creating container:", error);
          callback({ status: "error", message: "Failed to create container." });
        }
      });
      
    
      Socket.on("fetchContainers", async (callback) => {
        try {
          const containers = await Shipment.find({})
          console.log(containers)
            
          callback({ status: "ok", containers });
        } catch (error) {
          console.error("Error fetching containers:", error);
          callback({ status: "error", message: "Failed to fetch containers" });
        }
      });

      Socket.on("get_Shipment",async()=>{
        try{
           const allShipment= await Order.find()
           Socket.emit("fetched_Shipments", allShipment)
        }catch(err){
          console.log(err)
        }
      })



      Socket.on("getOrdersByShipment", async (shipmentId) => {
        try {
          const orders = await Order.find({ shipmentId }).populate("customer_id");
          Socket.emit("ordersByShipment", { shipmentId, orders });
        } catch (err) {
          Socket.emit("ordersByShipment", { shipmentId, error: "Failed to fetch orders" });
        }
      });
      

      Socket.on("editOrderStatus",async(data,callback)=>{
        console.log(data)
        try{
           const updated_shipment = await Shipment.findByIdAndUpdate(
            data.containerId,
            {
              route: data.selectedRoute,
              port: data.selectedCountry,
              status: data.shipmentStatus
            },
            { new: true }
          );  
          
          console.log(updated_shipment)
          callback({status:"ok",data:updated_shipment})
          console.log("this",Users[Socket.user.id])
          notificationsNamespace.to(Users[Socket.user.id]).emit("notify", {
            id: updated_shipment._id,
            message: "Your shipment has started",
            read: false,
          });

          const orders= await Order.find({shipmentId:data.containerId})
          .populate('customer_id','username')         // Replace with actual field name referencing User
          .populate('shipmentId','eta loadingDate route port cbmRate ');
          
          console.log("this orders",orders)
          orders.forEach( async(order)=>{
            const recipientSocketId = Users[order.customer_id._id.toString()];
            try{
              const notifications = new notification({
                userId:order.customer_id,
                message:`Shipment with tracking no. ${order.tracking_no} has been updated`,
                read: false
              })
             await notifications.save()
              if (recipientSocketId) {
                console.log("user",Users[recipientSocketId],Users)
                console.log(order.customer_id._id.toString())
                
                notificationsNamespace.to(recipientSocketId).emit("notify", notifications);
                trackingNamespace.to(recipientSocketId).emit("update_shipment", order);
            }
            }catch(error){
              console.log(err)
            }
            })
        }catch(err){
          console.log(err)
        }
      })


      Socket.on("deleteContainer",async(containerId,callback)=>{
        console.log(containerId)
        try{
           const delete_container = await Shipment.findOneAndDelete({_id:containerId})
           const admins = await User.find({account_type:"Business"})
           Socket.emit("container_deleted",containerId)
           callback({status:"ok",data:delete_container.containerNumber})
           const notify = {
            userId: Socket.user.id,
            message: `Container with number ${delete_container.containerNumber} deleted `,
          };
          console.log("socket",Users[Socket.user.id])
           notificationsNamespace.to(Users[Socket.user.id]).emit("notify",notify)
           orderListNamespace.in("adminRoom").emit("container_deleted",containerId)
           admins.forEach(async(admin)=>{
             const socket_id = Users[admin._id]
            try{
              const notifications = new notification({
                userId: admin._id,
                message: `Container with number ${delete_container.containerNumber} deleted `,
              });
              await notifications.save()
                notificationsNamespace.to(socket_id).emit("notify",notifications)
            }catch(error){
              console.log(error)
              callback({status:"error",message:"failed to delete container"})
            }
           })
        }catch(err){
          console.log(err)
        }
      })

      Socket.on("disconnect",()=>{
        for (const [userId, socketId] of Object.entries(Users)) {
          if (socketId === Socket.id) {
              delete Users[userId];
              break;
          }
      }
        
        console.log("disconnect from shipment Namespace")
      })
      
    return Socket
}


module.exports=shipping