const mongoose= require("mongoose")
const {Schema}= require("mongoose")

const VehicleSchema=Schema({
  NumberPlate:String,
  Model:String,
  Capacity:String,
  Year:Number,
  Status:String,
  createdAt:Date.now()
})

const DriversSchema=Schema({
    name:String, 
    license:String,
    Vehicle_id:{type:Schema.Types.ObjectId,ref:"Vehicle"},
    Status:String,
    createdAt:Date.now()
})
const vehicleModel= mongoose.model("Vehicle", VehicleSchema)
const driverModel= mongoose.model("Driver", DriversSchema)

module.exports={vehicleModel,driverModel}