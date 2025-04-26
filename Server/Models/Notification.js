const mongoose= require("mongoose")


const notificationSchema= new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, ref: "User"},
    message:String,
    read:{type:Boolean,default:false},
    createdAt: {
    type: Date,
    default: Date.now
  }
})

const notificationModel= mongoose.model("notification",notificationSchema)
module.exports= notificationModel