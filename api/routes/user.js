import express from "express";
import getUser   from "../controllers/user.js";
import { register, login, logout, changePassword, verifyEmail }  from "../controllers/user.js";



const router = express.Router()

router.get('/user', getUser)
router.post('/register',  register)
router.post('/changepass', changePassword)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)


export default router