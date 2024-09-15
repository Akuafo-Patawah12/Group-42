const {Shipment,Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")

const shipping= async(Socket,trackingNamespace,orderListNamespace,Users)=>{
   
      Socket.on("StartShippment",async(data)=>{
        try{
            console.log(data)
            const Id=data.Tracking_id.replace(/\t/g, '')
            const order= await Order.findByIdAndUpdate({_id:Id},{Status:data.status},{new:true})
            const  shipment= new Shipment({
                _id: data.Tracking_id,
                shippmentDate: data.shippingDate,
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
   
    return Socket
}

module.exports=shipping