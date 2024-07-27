const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  User_id: {
    type:Schema.Types.ObjectId,ref:"User"
   
  },
  post_id: {
    type:Schema.Types.ObjectId,ref:"Post "
     
  },
  comment: {
    type: String,
  },
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Create the user model
const Comment = mongoose.model('Comment', userSchema);

module.exports = Comment;
