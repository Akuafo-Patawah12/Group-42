const router= require("express").Router()
const {SignUp,login, updatePassword,logout}= require("../Controllers/Authentication")
const forgetPassword = require("../Utils/Nodemailer")
const {rateLimit}= require("express-rate-limit")
const { getUserProfile, deletePost } = require('../Controllers/Profile');
const contact = require("../Controllers/Contact")
const { updateEmail,settings_updatePassword,logoutAllSessions, deleteAccount } = require("../Controllers/Settings")
const Authenticate = require("../Middlewares/Authenticate")
const marketingMailSender = require("../Controllers/MarketingMailSender")
const confirmToken = require("../Controllers/ConfirmToken")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 30, // Limit each IP to 3 requests per `window` (here, per 5 minutes).
    message: { message: 'Too many attempts, please try again after 15 minutes.' },
    statusCode: 429, // Status code to send when rate limit is exceeded
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	
})




router.post("/SignUp",limiter, SignUp )
router.post("/Login",limiter, login)
router.put("/updatePassword/:id",updatePassword)
router.post("/forgetPassword",forgetPassword)
router.post("/logout", logout)
router.put("/update_email", updateEmail)
router.put("/password", settings_updatePassword);
router.post("/logout-all", logoutAllSessions);
router.post("/contact",limiter, contact)
router.delete("/delete-account", deleteAccount);
router.get('/profile/:id', Authenticate, getUserProfile);
router.post("/marketing-mail",limiter, marketingMailSender)
router.get("/confirm_token", confirmToken)
// Route to delete a post (requires authentication)
router.delete('/posts/:postId', Authenticate, deletePost);

module.exports= router