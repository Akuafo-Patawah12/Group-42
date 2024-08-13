const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  user_id: {
    type:Schema.Types.ObjectId,ref:"User"
   
  },
  post_id: {
    type:Schema.Types.ObjectId,ref:"Post"
     
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Create the user model
const Like = mongoose.model('Like', userSchema);

module.exports = Like;