const bcrypt= require('bcrypt')
const jwt=require ('jsonwebtoken')

const data= require('../Models/userSchema')
const sendVerificationEmail= require('../Utils/SendOTP')
const userDeviceInfo = require("../Utils/GetDevices")
const nodemailer = require("nodemailer")


//Login user
 async function login(req,res){
    
    const {email,password,rememberMe }= req.body.formData   //grabing user credentials from the client side.
    
    console.log(email,password,rememberMe )

    // Find a user whose device_info array contains the same string
 // User's device info
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const otp = generateOTP();
console.log(otp)
    try{
        const email_Exist= await data.findOne({email:email}); // Check if the email exists in the database
        
        if (!email_Exist) {
          return res.status(404).json({ message: "Email not found" });
        }

       if (email_Exist && email_Exist.device_info.includes(userDeviceInfo(req))) {
            console.log("Device info already exists for this user.");
          } else {
                await sendVerificationEmail(email,otp)
            
                email_Exist.verification_code= otp
                email_Exist.code_expires_at= Date.now() + 10 * 60 * 1000  // Code expires in 10 min
                await email_Exist.save();
            return res.status(400).json({ message: "Device info doesn't exist", id: email_Exist._id })
          };
        
       data.findOneAndUpdate({email},{active: new Date()},{new:true}) 
       console.log(email_Exist)

         const protected= email_Exist.account_type // find the user's account type "whether it's a personal or business account"

         const payload = {
            id: email_Exist._id, // Example user ID
            iat: Math.floor(Date.now() / 1000) // Set issued at timestamp
            
          };
         const access_token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m', // create an access cookie for authorization  
        })

        function sendCookie(){
            // create refresh token
            const refresh_token= jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: rememberMe ? '30d' : '1h' // 30 days if "Remember Me" is checked, else 1 hour  
            })
            /*send refresh token to browser cookies when ever the user logs in "this determine the 
            particular user who is logged in that's what res.cookie does"*/ 

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,   // Ensures that the cookie is only accessible via HTTP(S) requests
                path: '/',        // Specifies the path for which the cookie is valid
                secure: true,          // Indicates that the cookie should only be sent over HTTPS
                sameSite: 'Strict',      // Specifies same-site cookie attribute to prevent cross-site request forgery
                maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 30 days or 1 hour
        });   
        }
        if (!email_Exist || null) {
            return res.status(404).json({ message: "invalid email" }); // Email not found
        }

        const password_Is_Correct = await bcrypt.compare(password, email_Exist.password);

        if (!password_Is_Correct) {
            return res.status(401).json({ message: 'invalid password' }); // Incorrect password
        }

        switch (protected) {
            case "User":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as a user",
                    accessToken: access_token,
                    user_name: email_Exist.username,
                });

            case "Admin":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as an admin",
                    accessToken: access_token,
                    user_name: email_Exist.username,
                });

            default:
                return res.status(400).json({ message: 'Invalid account type' }); // Unexpected account type
        }
    }catch(err){
      console.log(err)
       return res.status(500).json(err) //Console 500 error message if server crashes
    }}


    const updatePassword= async(req,res)=>{
        const { token } = req.params;
        const { newPassword } = req.body;
        try{
      
        const user = await data.findOne({
          resetToken: token,
          resetTokenExpiry: { $gt: Date.now() }, // ensure it's not expired
        });
      
        if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token' });
        }
      
        //  Update password and clear reset fields
        user.password = await bcrypt.hash(newPassword, 10);
        user.passwordResetToken = null;            
        user.passwordResetExpiration = null;      
        await user.save();
      
        res.json({ message: 'Password has been reset successfully' });
    }catch(error){
        console.log(error)
        res.status(500).json({message:"failed to update password"})
    }

   }





// Register a new user 
const SignUp =async(req,res)=>{
    const {username,email,account_type,password }= req.body.formData //Extract credentials from the client
    const salt=  bcrypt.genSaltSync(10)

    
    console.log(username)
    try{
        const encryptedPassword= await bcrypt.hash(password,salt)  //hashing user password before inserting it into the database
        const emailExist= await data.findOne({email:email})  // Check if the email already exists in the database
        if(emailExist){ // If the email already exists, return a response indicating its existence
             res.json({message:'exist'});
             return
        }
        // If the email doesn't exist, insert the new user data into the database
            await data.insertMany({
                 username,
                 email,
                 account_type,
                 password: encryptedPassword,
                 device_info: [userDeviceInfo(req)]              
            });
           return res.json({message:'not exist'}); 
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


const forgetPassaword = async (req, res) => {
    try{
    const { email } = req.body;
    console.log(email)
    const user = await data.findOne({ email });
  
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = Date.now() + 1000 * 60 * 60; // 1 hour
  
    user.passwordResetToken = token;
    user.passwordResetExpiration = expiry;
    await user.save();
  
    const resetLink = `http://localhost:3000/reset-password/${token}`;
  
    // Configure mailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  
    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<a href="${resetLink}">Click here to reset your password</a>`
    });
  
    res.status(200).json({ message: 'Password reset email sent' });

}catch(error){
    res.status(500).json({message:"failed to send link for reset password"})
}
  };


  const verifyOTP = async (req, res) => {
    const { id, code } = req.body;
  
    try {
      const user = await data.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (
        String(user.verification_code) !== String(code) ||
        new Date() > new Date(user.code_expires_at)
      ) {
        return res.status(400).json({ message: "Invalid or expired verification code" });
      }
    
  
      // Optional: clear code after verification
      user.verification_code = null;
      user.code_expires_at = null;
      user.device_info.push(userDeviceInfo(req))
      await user.save();
      
      const payload = {
        id: user._id, // Example user ID
        iat: Math.floor(Date.now() / 1000) // Set issued at timestamp
        
      };
      const access_token= jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '15m', // create an access cookie for authorization  
    })

    let rememberMe=true
    const refresh_token= jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
      expiresIn: rememberMe ? '30d' : '1h' // 30 days if "Remember Me" is checked, else 1 hour  
  })
  /*send refresh token to browser cookies when ever the user logs in "this determine the 
  particular user who is logged in that's what res.cookie does"*/ 

  res.cookie('refreshToken', refresh_token, {
      httpOnly: true,   // Ensures that the cookie is only accessible via HTTP(S) requests
      path: '/',        // Specifies the path for which the cookie is valid
      secure: true,          // Indicates that the cookie should only be sent over HTTPS
      sameSite: 'Strict',      // Specifies same-site cookie attribute to prevent cross-site request forgery
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000 // 30 days or 1 hour
});
      
      if(user.account_type==="User"){
       res.status(200).json({ 
        message: "Verified user",
        accessToken: access_token,
        user_name: user.username
      });
      }else{
        res.status(200).json({ 
          message: "Verified admin",
          accessToken: access_token,
          user_name: user.username
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
    
    //logging out user
    async function logout (req,res){
        res.cookie("refreshToken","",{maxAge:1});  // set the expiring time of the token to 1 second
            res.status(200).json("Success")
       }


       
    
module.exports= {
   login,SignUp,logout,updatePassword,forgetPassaword,verifyOTP
};
