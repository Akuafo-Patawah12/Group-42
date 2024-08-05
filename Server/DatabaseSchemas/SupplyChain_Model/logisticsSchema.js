const mongoose = require('mongoose');
const { Schema } = mongoose;

const packageSchema= new Schema({
    name:String,
    dimensions:{
       weight:Number,
       height:Number,
       length:Number
    },
    shippingAddress:String,
    status:String
})

const package= mongoose.model('Package', packageSchema)

module.exports= package