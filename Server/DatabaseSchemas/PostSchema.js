const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  user_id: {type:Schema.Types.ObjectId,ref:"User"},
  caption: {
    type: String 
  },
  img_vid: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the user model
const Post = mongoose.model('Post', userSchema);

module.exports = Post;
