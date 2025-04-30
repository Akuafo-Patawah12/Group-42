const router= require("express").Router()
const {SignUp,login, updatePassword,logout}= require("../Controllers/Authentication")
const forgetPassword = require("../Utils/Nodemailer")
const {rateLimit}= require("express-rate-limit")
const { getUserProfile, deletePost } = require('../Controllers/Profile');
const contact = require("../Controllers/Contact")
const { 
	updateEmail,
	deleteAccount,
	getUser,
	requestChangeEmail,
	verifyEmailChange,
	updateUsername,
	settings_updatePassword,
	logoutAllSessions,
	notificationSettings,
	getNotificationPreference
} = require("../Controllers/Settings")
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
router.post("/contact",limiter, contact)
router.delete("/delete-account", deleteAccount);
router.get('/profile/:id', Authenticate, getUserProfile);
router.post("/marketing-mail",limiter, marketingMailSender)
router.get("/confirm_token", confirmToken)
router.get("/getUser", Authenticate, getUser); 
router.post("/verify-email-change",Authenticate,verifyEmailChange)
router.post("/request-email-change",Authenticate, requestChangeEmail)
router.post("/change-username",Authenticate, updateUsername)
router.post("/update-password",Authenticate, settings_updatePassword)
// Route to delete a post (requires authentication)
router.delete('/posts/:postId', Authenticate, deletePost);
router.delete("/delete-account",Authenticate, deleteAccount);
router.post("/delete-all-devices",Authenticate, logoutAllSessions)
router.post("/update-notification-preference",Authenticate,notificationSettings)
router.get("/get-notification-preference",Authenticate,getNotificationPreference)

module.exports= router