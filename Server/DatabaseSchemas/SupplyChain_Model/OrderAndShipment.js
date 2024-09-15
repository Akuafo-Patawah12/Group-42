const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema= new Schema({

    //Linking the users table to the order table
        customer_id: {type:Schema.Types.ObjectId,ref:"User"},  
        items: [
          {
            itemId: {type:Schema.Types.ObjectId,ref:"Item"},
            quantity: Number,
            price: Number
          }
        ],
        totalAmount: Number,
        shipmentId: {type:Schema.Types.ObjectId, ref:"Shipment"},
      
      
    Status:{
       type:String,
        enum: ["Pending...","In-Transit","Delivered"],
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
       street: String,
       city: String,
       state: String,
       postalCode: String,
       country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Order= mongoose.model('Order', orderSchema)
const Shipment= mongoose.model("Shipment",shipmentSchema)

module.exports= {Order,Shipment}