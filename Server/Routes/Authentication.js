const bcrypt= require('bcrypt')
const jwt=require ('jsonwebtoken')
const data= require('../DatabaseSchemas/userSchema')


//Login user
 


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
        const encryptedPassword= await bcrypt.hash(password,salt)
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
   SignUp,logout,sessionLogout,updatePassword
};
