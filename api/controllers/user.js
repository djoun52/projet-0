import User from "../models/user.js";
import EmailVerificationToken from "../models/emailVerificationToken.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";


const secret = "secret123";

export default function getUser(req, res) {
    try {
        const payload = jwt.verify(req.cookies.token, secret);
        User.findById(payload.id)
            .then(userInfo => {
                res.json({ statue: 'user', id: userInfo._id, email: userInfo.email, pseudo: userInfo.pseudo, roles: userInfo.roles });
            }).catch(() => {
                res.json({ response: 'Error' })
            })
    } catch (err) {
        res.json({ statue: 'no user' })
    }
}

export function register(req, res) {
    const { email, pseudo, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    let OTP = ''
    for (let i = 0; i <= 5; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }
    const HashedOTP = bcrypt.hashSync(OTP, 10);

    User.findOne({ email }).then(data => {
        if (data == null) {
            const user = new User({ email: email, pseudo: pseudo, password: hashedPassword, roles: ["commonUser"] });
            user.save().then(userInfo => {
                const emailVerificationToken = new EmailVerificationToken({ owner: userInfo._id, token: HashedOTP })
                emailVerificationToken.save();
                let transport = nodemailer.createTransport({
                    host: "smtp.mailtrap.io",
                    port: 2525,
                    auth: {
                        user: "e289a8f1d95375",
                        pass: "18c65de80695da"
                    }
                });
                transport.sendMail({
                    from: 'verification@projet0.com',
                    to: userInfo.email,
                    subject: 'Email Verification',
                    html: `
                    <p> your verification token </p>
                    <h1> ${OTP} </h1>
                    <p> use this link to verify your email address</p>
                    <a href="http://localhost:3000/verif-email/${userInfo._id}">lien</a>
                    `
                })
                jwt.sign({ id: userInfo._id, email: userInfo.email }, secret, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                    } else {
                        res.cookie('token', token).json({ id: userInfo._id, email: userInfo.email, pseudo: userInfo.pseudo, roles: userInfo.roles });
                    }
                })
            })
        } else {
            res.status(401).json({ statue: "email already exists" });
        }

    })

}

export function login(req, res) {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(userInfo => {
            if (userInfo != null) {
                const passVerif = bcrypt.compareSync(password, userInfo.password);
                if (passVerif) {
                    jwt.sign({ id: userInfo._id, email }, secret, (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500);
                        } else {
                            res.status(201).cookie('token', token).json({ id: userInfo._id, email: userInfo.email, pseudo: userInfo.pseudo, roles: userInfo.roles });
                        }
                    });
                } else {
                    res.status(401).json({message: "wrong password"});
                }
            } else {
                res.status(401);
            }
        })
}


export function logout(req, res) {
    res.cookie('token', '').send();
}

export function changePassword(req, res){
    const { oldPassword, newPassword, userId } = req.body;
    const hashedOldPassword = bcrypt.hashSync(oldPassword, 10);
    const hashednewPassword = bcrypt.hashSync(newPassword, 10);
    
    

    if (!mongoose.isValidObjectId(userId)) return res.json({ error: 'invalid user' });
    User.findById(userId).then(userInfo => {
        if (!userInfo) return res.json({ error: 'user not found' });
        if (!bcrypt.compare(hashedOldPassword, userInfo.password)) return res.json({ error: 'mauvais mots de passe' });
        userInfo.password = hashednewPassword;
        userInfo.save();
    })
}

export function verifyEmail(req, res) {
    const { userId, OTP } = req.body;
    if (!mongoose.isValidObjectId(userId)) return res.json({ error: 'invalid user' });
    User.findById(userId).then(userInfo => {
        if (!userInfo) return res.json({ error: 'user not found' });
        if (userInfo.isVerified) return res.json({ error: 'user is already verified' });
        EmailVerificationToken.findOne({ owner: userId }).then(token => {
            if (!token) return res.json({ error: 'token not found' });
            const isMatched = bcrypt.compare(OTP, token.token);
            if(!isMatched) return res.json({ error: 'Please submit a valid OTP'})
            userInfo.isVerified = true;
            userInfo.save();
            EmailVerificationToken.findByIdAndDelete(token._id)
        })
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "e289a8f1d95375",
                pass: "18c65de80695da"
            }
        });
        transport.sendMail({
            from: 'verification@projet0.com',
            to: userInfo.email,
            subject: 'Welcome Email',
            html: `<h1>Welcome to our app and thanks for choosing us.</h1>`
        })
        res.json({message: 'Your email is verified'})
    })
}