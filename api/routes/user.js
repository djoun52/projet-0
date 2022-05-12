import express from "express";
import getUser   from "../controllers/user.js";
import {register, login, logout }  from "../controllers/user.js";


const router = express.Router()

router.get('/user', getUser)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)


export default router