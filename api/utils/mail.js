import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export default function generateOTP(opt_lenght = 6) {
    let OTP = ''
    for (let i = 1; i <= opt_lenght; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal
    }
    
    return OTP
}

export const generateMailTransporter = () =>
    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e289a8f1d95375",
            pass: "18c65de80695da"
        }
    });
