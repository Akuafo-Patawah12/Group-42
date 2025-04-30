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
  lastUsernameChange: Date,
  device_info: {
      type: [String] // To specify that it's an array of strings
    },
    passwordResetToken: {
        type: String,
        default:null
    },
    passwordResetExpiration: {
        type: Date,
        default :null
    },
    verification_code:{type:Number,default:null},
    code_expires_at:{type:Date,default:null},
  active:{
     type: Date,
    default: Date.now
  
  },
  notificationPreference: {
  type: Boolean,
  default: true // allow notifications by default
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
