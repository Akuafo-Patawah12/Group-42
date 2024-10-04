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

      Socket.on("disconnect",()=>{
        console.log("disconnect from shipment Namespace")
      })
      
    return Socket
}

module.exports=shipping