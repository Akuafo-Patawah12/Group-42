const router= require("express").Router()
const {SignUp,login}= require("./Routes/Authentication")


router.post("/SignUp", SignUp )
router.post("/Login", login)


module.exports= router