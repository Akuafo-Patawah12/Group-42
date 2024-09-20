const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema= new Schema({

    //Linking the users table to the order table
        customer_id: {type:Schema.Types.ObjectId,ref:"User"},  
        items: [
          {
            itemName: String,
            quantity: Number,
          }
        ],
        totalAmount: Number,
        shipmentId: {type:Schema.Types.ObjectId, ref:"Shipment"},
        origin: String,
          
        destination:String,
            
      
    Status:{
       type:String,
        enum: ["Pending...","in-Transit","Delivered"],
        default:"Pending..."
    }
    ,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updateAt:Date
})

const shipmentSchema= new Schema({
    order_id:{type:Schema.Types.ObjectId,ref:"Order"},
    trackingNumber: String,
    shippmentDate: Date,
    deliveryDate: Date,
    status:String,
    origin: {
      type: String,
      required: true,
       },
       destination: {
        type: String,
        required: true,
        },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Order= mongoose.model('Order', orderSchema)
const Shipment= mongoose.model("Shipment",shipmentSchema)

module.exports= {Order,Shipment}