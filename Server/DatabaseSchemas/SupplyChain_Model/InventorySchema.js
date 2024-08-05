const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema= new Schema({
    name:String,
    description:String,
    quantity:Number,
    price:Number
})

const categoriesSchema= new Schema({
    name:String
})
const categories= mongoose.model("Categories",categoriesSchema)
const item= mongoose.model("Item", itemSchema)

module.exports={ item,categories} 