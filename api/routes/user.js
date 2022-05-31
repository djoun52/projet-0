import express from "express";
import getUser, { register, login, logout, changePassword, verifyEmail, resendEmailVerifToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword }  from "../controllers/user.js";
import isValidPassResetToken from "../middlewares/user.js";
import validate from "../middlewares/validator.js"

const router = express.Router()

router.get('/user', getUser)
router.post('/register',  register)
router.post('/changepass', changePassword)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/resend-email-verif-token', resendEmailVerifToken)
router.post('/forget-password', forgetPassword)
router.post("/verify-pass-reset-token",isValidPassResetToken,sendResetPasswordTokenStatus
);
router.post("/reset-password",validate,isValidPassResetToken,resetPassword
);

export default router