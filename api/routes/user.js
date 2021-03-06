import express from "express";
import getUser, { register, login, logout, changePassword, verifyEmail, resendEmailVerifToken, forgetPassword, resetPassword,isValidPassResetToken }  from "../controllers/user.js";

const router = express.Router()

router.get('/user', getUser)
router.post('/register',  register)
router.post('/changepass', changePassword)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/resend-email-verif-token', resendEmailVerifToken)
router.post('/forget-password', forgetPassword)
router.post("/verify-pass-reset-token",isValidPassResetToken);
router.post("/reset-password",resetPassword);

export default router