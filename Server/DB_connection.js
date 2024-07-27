const mongoose = require('mongoose');
require('dotenv').config();

const connection=()=>{
    return mongoose.connect(process.env.mongoURI, { useNewUrlParser: true,
         useUnifiedTopology: true ,
        })
}

module.exports= connection