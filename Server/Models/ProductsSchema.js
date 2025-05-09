const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const productsSchema = new Schema({
  user_id: {type:Schema.Types.ObjectId,ref:"User"},
  caption: {
    type: String 
  },
  img_vid: {
    type: String,
    
  },
  category:String,
  product_codition:String,
  website_url:String,
  price: Number,
  premium: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the user model
const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
