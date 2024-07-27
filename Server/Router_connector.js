const router= require("express").Router()
const {SignUp, updatePassword}= require("./Routes/Authentication")
const forgetPassword = require("./Routes/Nodemailer")


router.post("/SignUp", SignUp )

router.put("/updatePassword/:id",updatePassword)
router.post("/forgetPassword",forgetPassword)


module.exports= router