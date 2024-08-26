const bcrypt= require('bcrypt')
const jwt=require ('jsonwebtoken')
const data= require('../DatabaseSchemas/userSchema')



//Login user
 async function login(req,res){
    
    const {email,password,rememberMe }= req.body.formData   //grabing user credentials from the client side.
    try{
        const email_Exist= await data.findOne({email:email}); /* check whether the email exist in the database 
       and store it in email exist variable */
        

        
         

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
            case "Personal":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as an individual",
                    accessToken: access_token
                });

            case "Business":
                sendCookie(); // Set the refresh token cookie
                return res.json({
                    message: "Logged in as a company",
                    accessToken: access_token
                });

            default:
                return res.status(400).json({ message: 'Invalid account type' }); // Unexpected account type
        }
    }catch(err){
       return res.status(500).json(err) //Console 500 error message if server crashes
    }}


    const updatePassword= async(req,res)=>{
        const {password}=req.body
        const {id}= req.params
        try{
           const encryptedPassword= await bcrypt.hash(password,10)
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
        const cookie = req.cookie;
    
        try {
            if(!cookie.includes("refreshToken")){
                res.json({ message: 'Successfully logged out' }); 
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
