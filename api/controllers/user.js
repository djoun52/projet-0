import User from "../models/user.js";
import EmailVerificationToken from "../models/emailVerificationToken.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


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
    for (let i = 0; i <=5 ; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }
    const HashedOTP = bcrypt.hashSync(OTP, 10);

    User.findOne({ email }).then(data => {
        if (data == null) {
            const user = new User({ email: email, pseudo: pseudo, password: hashedPassword, roles: ["commonUser"] });
            user.save().then(userInfo => {
                const emailVerificationToken = new EmailVerificationToken({ owner: userInfo._id, token: HashedOTP })
                emailVerificationToken.save() ;
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
                    res.status(401);
                }
            } else {
                res.status(401);
            }
        })
}


export function logout(req, res) {
    res.cookie('token', '').send();
}