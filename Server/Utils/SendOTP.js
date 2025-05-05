const nodemailer= require("nodemailer")
const tls = require('tls');

require("dotenv").config()

async function sendVerificationEmail(email, code) {
try{
    console.log(email,code)
    
      let transporter =nodemailer.createTransport({  //create transport allows to create communicating channel
                      host: 'smtp.gmail.com',
                      port: 465,
                      secure: true,
                      auth: {
                          user: process.env.EMAIL,//email that will be sending messages from the server to the client
                          pass: process.env.PASSWORD  //generated password form less secured apps from Google
                      },
                      tls: {
                          rejectUnauthorized: false, //do not reject self-signed certificates  
                        },
                      })
  
                     
  
  
  
    let mailOptions = {
      from: `"SF Ghana Logistics" <${process.env.EMAIL}>`,
      to: email,
      subject: "New Device Login - Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
  <div style="max-width: 500px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">

    <!-- Email Content -->
    <h2 style="color: #333; text-align: center;">Verify Your Login</h2>
    <p style="color: #555; font-size: 15px;">
      We noticed a login attempt from a new device or browser.
    </p>

    <p style="font-size: 15px; color: #333;">
      <strong>Your verification code is:</strong>
      <span style="font-size: 22px; color: #2d3748; font-weight: bold; display: inline-block; margin-top: 5px;">
        ${code}
      </span>
    </p>

    <p style="font-size: 15px; color: #555;">
      If this wasn't you, please 
      <a href="http://localhost:5173/forget_password" style="color: #d9534f; text-decoration: none; font-weight: bold;">
        secure your account
      </a>
      immediately.
    </p>

    <p style="font-size: 14px; color: #999; margin-top: 30px;">
      Best regards,<br>
      <strong>SF Ghana Logistics Ltd</strong>
    </p>
  </div>
</div>

      `,

      replyTo: process.env.EMAIL,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
}catch(err){
    console.log(err)
}
  }

  module.exports= sendVerificationEmail
  