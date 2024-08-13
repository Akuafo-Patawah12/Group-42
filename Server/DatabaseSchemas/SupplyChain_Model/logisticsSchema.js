const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema= new Schema({
    userId: {type:Schema.Types.ObjectId,ref:"User"},
    items:[
        {
            productId:{type:Schema.Types.ObjectId,ref:"Product"},
            quantity:Number,
            price:Number
        }
    ],
    totalAmount:Number,
    Status:String,
    createdAt:Date.now()
})

const shipmentSchema= Schema({
    order_id:{type:Schema.Types.ObjectId,ref:"Order"},
    vehicle_id:{type:Schema.Types.ObjectId,ref:"Transport"},
    status:String,
    destination:String,
    createdAt:Date.now()
})

const order= mongoose.model('Order', orderSchema)
const shipment= mongoose.model("Shipment",shipmentSchema)

module.exports= {order,shipment}