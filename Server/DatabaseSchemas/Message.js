const mongoose= require("mongoose")
const {Schema}= mongoose

const messageSchema= new Schema({
    sender_id:{type:Schema.Types.ObjectId, ref:"User"},
    receipient_id:{type:Schema.Types.ObjectId, ref:"User"},
    Message:String
})


const messageModel= mongoose.model("message", messageSchema)

module.exports= messageModel;