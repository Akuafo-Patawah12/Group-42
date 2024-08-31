const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema= new Schema({
    name:String,
    description:String,
    quantity:Number,
    price:Number,
    reorderlevel:Number,
    warehouseLocation:String,
    createdAt:Date.now()
})

const Item= mongoose.model("Item", itemSchema)

module.exports= Item