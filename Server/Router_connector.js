const router= require("express").Router()
const {SignUp,login, updatePassword}= require("./Routes/Authentication")
const forgetPassword = require("./Routes/Nodemailer")


router.post("/SignUp", SignUp )
router.post("/Login", login)
router.put("/updatePassword/:id",updatePassword)
router.post("/forgetPassword",forgetPassword)


module.exports= router