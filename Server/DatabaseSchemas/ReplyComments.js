const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  User_id: {
    type:Schema.Types.ObjectId,ref:"User"
   
  },
  post_id: {
    type:Schema.Types.ObjectId,ref:"Post"
     
  },
  comment_id: {
    type:Schema.Types.ObjectId,ref:"Comment"
  },
  reply:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Create the user model
const Reply = mongoose.model('ReplyComment', userSchema);

module.exports = Reply;
