const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
     
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
 
  },
  password: {
    type: String,
    required: true
  },
  account_type: {
    type:String,
    enum: ["Personal","Business"],
    default: "Personal",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
