import User from "../models/user.js";
import EmailVerificationToken from "../models/emailVerificationToken.js";
import passwordResetToken from "../models/passwordResetToken.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import generateOTP, { generateMailTransporter } from "../utils/mail.js";
import { sendError } from '../utils/helper.js'
import crypto from 'crypto'
import dotenv from "dotenv"
import passport from "passport"



export default function getUser(req, res) {
    try {
        const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
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
    const OTP = generateOTP()
    const HashedOTP = bcrypt.hashSync(OTP, 10);
    User.findOne({ email }).then(data => {

        if (data != null) return sendError(res, 'email already exists');
        const user = new User({ email: email, pseudo: pseudo, password: hashedPassword, roles: ["commonUser"] });
        user.save().then(userInfo => {
            const emailVerificationToken = new EmailVerificationToken({ owner: userInfo._id, token: HashedOTP })
            emailVerificationToken.save();
            let transport = generateMailTransporter();
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
            jwt.sign({ id: userInfo._id, email: userInfo.email }, process.env.JWT_SECRET , (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 2 }).json({ id: userInfo._id, email: userInfo.email, pseudo: userInfo.pseudo, roles: userInfo.roles });
                }
            })
        })

    })

}

export function login(req, res) {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(userInfo => {
            if (!userInfo) return sendError(res, 'user not found');
            const passVerif = bcrypt.compareSync(password, userInfo.password);
            if (!passVerif) return sendError(res, "wrong password");
            jwt.sign({ id: userInfo._id, email }, process.env.JWT_SECRET ,{ expiresIn: "1d" }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else {
                    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 * 2 }).json({ id: userInfo._id, email: userInfo.email, pseudo: userInfo.pseudo, roles: userInfo.roles });
                }
            });
        })
}


export function logout(req, res) {
    res.cookie('token', '').send();
}

export function changePassword(req, res) {
    const { oldPassword, newPassword, userId } = req.body;
    const hashedOldPassword = bcrypt.hashSync(oldPassword, 10);
    const hashednewPassword = bcrypt.hashSync(newPassword, 10);

    if (!mongoose.isValidObjectId(userId)) return sendError(res, 'invalid user');
    User.findById(userId).then(userInfo => {
        if (!userInfo) returnsendError(res, 'user not found');
        if (!bcrypt.compare(hashedOldPassword, userInfo.password)) return sendError(res, 'mauvais mots de passe');
        userInfo.password = hashednewPassword;
        userInfo.save();
        res.json({mess: "pass change"});
    })
}

export function verifyEmail(req, res) {
    const { userId, OTP } = req.body;
    if (!mongoose.isValidObjectId(userId)) return sendError(res, 'invalid user');
    User.findById(userId).then(userInfo => {
        if (!userInfo) return sendError(res, 'user not found');
        if (userInfo.isVerified) return sendError(res, 'user is already verified');
        EmailVerificationToken.findOne({ owner: userId }).then(token => {
            if (!token) return sendError(res, 'token not found');
            const isMatched = bcrypt.compare(OTP, token.token);
            if (!isMatched) return sendError(res, 'Please submit a valid OTP')
            userInfo.isVerified = true;
            userInfo.save();
            EmailVerificationToken.findByIdAndDelete(token._id)
        })
        let transport = generateMailTransporter();
        transport.sendMail({
            from: 'verification@projet0.com',
            to: userInfo.email,
            subject: 'Welcome Email',
            html: `<h1>Welcome to our app and thanks for choosing us.</h1>`
        })
        res.json({ message: 'Your email is verified' })
    })
}

export function resendEmailVerifToken(req, res) {
    const { userId } = req.body;

    const OTP = generateOTP()
    const HashedOTP = bcrypt.hashSync(OTP, 10);
    User.findById(userId).then(userInfo => {
        if (!userInfo) return sendError(res, 'user not found');
        if (userInfo.isVerified) return sendError(res, 'user is already verified');
        EmailVerificationToken.findOne({ owner: userId }).then(token => {
            if (token) return sendError(res, 'your last token is still valid');
        });
        const emailVerificationToken = new EmailVerificationToken({ owner: userInfo._id, token: HashedOTP })
        emailVerificationToken.save();
        const verificationTokenUrl = `http://localhost:3000/verif-email/${userInfo._id}`
        let transport = generateMailTransporter()
        transport.sendMail({
            from: 'verification@projet0.com',
            to: userInfo.email,
            subject: 'Email Verification',
            html: `
                    <p> your verification token </p>
                    <h1> ${OTP} </h1>
                    <p> use this link to verify your email address</p>
                    <a href=${verificationTokenUrl}>lien</a>
                    `
        })
        res.json({ message: 'new token send to your email address' })
    });
}

export function forgetPassword(req, res) {
    const { email } = req.body;
    User.findOne({ email }).then(userInfo => {
        if (!userInfo) return sendError(res, 'user not found', 404);
        passwordResetToken.findOne({ owner: userInfo._id }).then(token => {
            if (token) return sendError(res, 'your last token is still valid');
            crypto.randomBytes(30, (err, buffer) => {
                if (err) return console.error(err);
                const token = buffer.toString('hex')
                const newPasswordResetToken = new passwordResetToken({ owner: userInfo._id, token });
                newPasswordResetToken.save();
                const resetPasswordUrl = `http://localhost:3000/reset-pasword?token=${token}&id=${userInfo._id}`;
                let transport = generateMailTransporter()
                transport.sendMail({
                    from: 'security@projet0.com',
                    to: userInfo.email,
                    subject: 'Reset Password Link',
                    html: `
                    <p> Click here to reset your password</p>
                    <p>${token}</p>
                    <a href=${resetPasswordUrl}>lien</a>
                    `
                })
                res.json({ message: 'Link sent to your email' })
            })
        })
    })
}

export function sendResetPasswordTokenStatus(req, res) {
    res.json({ valid: true });
};

export function resetPassword(req, res) {
    const { newPassword, userId } = req.body;
    User.findById(userId).then((user) => {
        user.password = newPassword;
        user.save();
        PasswordResetToken.findByIdAndDelete(req.resetToken._id);
        const transport = generateMailTransporter();
        transport.sendMail({
            from: "security@reviewapp.com",
            to: user.email,
            subject: "Password Reset Successfully",
            html: `
                <h1>Password Reset Successfully</h1>
                <p>Now you can use new password.</p>
            `,
        });
        res.json({
            message: "Password reset successfully, now you can use new password.",
        });
    })
}