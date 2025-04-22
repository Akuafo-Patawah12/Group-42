const {Shipment,Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")

const shipping= async(Socket,trackingNamespace,orderListNamespace,Users)=>{
   
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
          const {  containerNumber,loadingDate, status, port, route, eta, cbmRate } = data;
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
      

      Socket.on("disconnect",()=>{
        console.log("disconnect from shipment Namespace")
      })
      
    return Socket
}


module.exports=shipping