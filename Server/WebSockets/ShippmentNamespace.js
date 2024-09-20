const {Shipment,Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")

const shipping= async(Socket,trackingNamespace,orderListNamespace,Users)=>{
   
      Socket.on("StartShippment",async(data)=>{
        try{
            console.log(data)
            const Id=data.Tracking_id.replace(/\t/g, '')  //removing whitespace from the id
            const order= await Order.findByIdAndUpdate({_id:Id},{Status:data.status},{new:true})
            const  shipment= new Shipment({
                order_id: data.Tracking_id,
                shippmentDate: data.shippingDate,
                origin:order.origin,
                destination:order.destination,
                status: data.status
            })
             console.log(order)
            await shipment.save()

            orderListNamespace.emit("SendShippment",shipment)
            trackingNamespace.to(Users[order.customer_id]).emit("StatusUpdate", shipment);
        }catch(error){
            console.log(error)
        }
      })

      Socket.on("allShipment",async()=>{
          try{
             const allshipping= await Shipment.find({})

             Socket.emit("getAllShipment", allshipping)
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