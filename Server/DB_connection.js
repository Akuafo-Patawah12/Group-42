const mongoose = require('mongoose');
require('dotenv').config();

const connection=()=>{
    return mongoose.connect(process.env.mongoURI)
}

module.exports= connection