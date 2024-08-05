const bcrypt= require('bcrypt')
const jwt=require ('jsonwebtoken')
const data= require('../DatabaseSchemas/userSchema')



//Login user
 async function login(req,res){
    
    const {email,password }= req.body.formData   //grabing user credentials from the client side.
    try{
        const email_Exist= await data.findOne({email:email}); /* check whether the email exist in the database 
       and store it in email exist variable */
        let Encrypted_Password= email_Exist.password  //if email exist get the user's password 

         const password_Is_Correct= await bcrypt.compare(password, Encrypted_Password); /*Here compare the password
         the user type in the frontend and the one in the database if it's the same */

         const protected= email_Exist.account_type // find the user's account type "whether it's a personal or business account"

         const access_token= jwt.sign({id: email_Exist._id}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15m', // create an access cookie for authorization  
        })

        function sendCookie(){
            // create refresh token
            const refresh_token= jwt.sign({id: email_Exist._id}, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '6d',   
            })
            /*send refresh token to browser cookies when ever the user logs in "this determine the 
            particular user who is logged in that's what res.cookie does"*/ 

            res.cookie('refreshToken', refresh_token, {
                httpOnly: true,   // Ensures that the cookie is only accessible via HTTP(S) requests
                path: '/',        // Specifies the path for which the cookie is valid
                secure: true,          // Indicates that the cookie should only be sent over HTTPS
                sameSite: 'none',      // Specifies same-site cookie attribute to prevent cross-site request forgery
                maxAge: 7 * 24 * 60 * 60 * 1000    // Sets the expiration time of the cookie (7 days in milliseconds)
        });   
        }
        if(email_Exist){ //checking if the email the user login with exist in the database
            if(password_Is_Correct && protected==="Personal" ){
                // Set the refresh token as a cookie and send it to the browser after login
                sendCookie()  // we called the function to send token to the browser   
            res.json({
              message: "Logged in as an individual", //Send this message to the client app if user logs in as a individual
              accessToken: access_token
      }); //send a response from server to client if email & password exist 
            }else if(password_Is_Correct && protected==="Business"){
                 sendCookie()
                res.json({
                    message: "Logged in as a company",
                    accessToken: access_token
                  });
            }else{
                res.json({message:'invalid password'}); 
            }
        }else{
            res.json({message:"invalid email"})
        }
    }catch(err){
       res.status(404).json(err) //Console 404 error message if server crashes
    }}


    const updatePassword= async(req,res)=>{
        const {Password}=req.body
        const {id}= req.params
        try{
           const encryptedPassword= await bcrypt.hash(Password,10)
            const findPassword= await data.findByIdAndUpdate(id,{password:encryptedPassword},{new:true})
            if(findPassword){
               return res.json({message:"Password Updated"})
            }else {
               return res.status(404).json({ message: "User not found" });
           }
        }catch(err){
           console.log(err);
           res.status(500).json(err)
        }
   }





// Register a new user 
const SignUp =async(req,res)=>{
    const {username,email,account_type,password }= req.body.formData
    const salt=  bcrypt.genSaltSync(10)
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
            });
           return res.json({message:'not exist'}); 
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}
    
    //logging out user
    async function logout (req,res){
        res.cookie("refreshToken","",{maxAge:1});
            res.json("Success")
       }


       async function sessionLogout(req, res) {
        // Retrieve the refresh token from the request cookies
        const refreshToken = req.cookies.refreshToken;
    
        try {
            // Check if the refresh token is missing
            if (!refreshToken) {
                // If verification succeeds, delete the refresh token from cookies
                res.clearCookie('refreshToken').json({ message: 'Successfully logged out' }); 
            }
        } catch (err) {
            // Handle token verification error
            console.log('Error verifying refresh token:', err);
            res.status(401).json({ error: 'Failed to logout' });
        }
    };
    
module.exports= {
   login,SignUp,logout,sessionLogout,updatePassword
};
