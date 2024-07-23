const nodemailer = require('nodemailer');
const tls = require('tls');
const jwt= require('jsonwebtoken');
const data=require('../DatabaseSchemas/userSchema');

const forgetPassword = async(req,res)=>{
    const {email} =req.body
    try{
        const confirm= await data.findOne({email:email}); 
        if(confirm){ 
        let token= jwt.sign({id:confirm._id}, process.env.FORGETPASSWORD_TOKEN_SECRET,{
            expiresIn: '15m', 
        });
                         
        let transporter=nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false, // do not reject self-signed certificates
              },
        });  
        let mailOptions = {
            from: '"Do Not Reply" <' + process.env.EMAIL + '>',
            to: email,
            subject: 'Reset your password',
            html: `<a href="http://localhost:3000/ResetPassword/${confirm._id}">➡️ Click this link to reset password ⬅️</a>`
        }; 
        
       transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log("success")
          }}); 
       res.json("valid email")
    }else{
        res.json("invalid email")  
    }    
      
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports= forgetPassword