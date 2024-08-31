const mongoose= require("mongoose")
const {Schema}=mongoose

const trackingSchema= new Schema({
    
       
        shipmentId: ObjectId,
        trackingNumber: String,
        statusUpdates: [
          {
            status: String, // e.g., "Picked Up", "In Transit", "Out for Delivery", "Delivered"
             location: {
              city: String,
              state: String,
              country: String
            },
            timestamp: Date
          }
        ],
        currentStatus: String, // e.g., "In Transit", "Delivered"
        lastUpdated: Date
      
      
})

const trackingModel= mongoose.model("Tracking",trackingSchema)

module.exports= trackingModel