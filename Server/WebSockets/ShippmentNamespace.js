const {Shipment,Order}= require("../DatabaseSchemas/SupplyChain_Model/OrderAndShipment")

const shipping= async(Socket,trackingNamespace,orderListNamespace)=>{
   
      Socket.on("StartShippment",async(data)=>{
        try{
            console.log(data)
            const order= await Order.findByIdAndUpdate({_id:data.Tracking_id},{Status:data.status},{new:true})
            const  shipment= new Shipment({
                order_id: data.Tracking_id,
                shippmentDate: data.shippingDate,
                status: data.status
            })

            await shipment.save()

            orderListNamespace.emit("SendShippment",shipment)
        }catch(error){
            console.log(error)
        }
      })
   
    return Socket
}

module.exports=shipping