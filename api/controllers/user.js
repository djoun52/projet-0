import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const secret = "secret123";

export default function getUser(req, res){
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

export function register(req, res){
    const { email, pseudo, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.findOne({ email }).then(data => {
        if (data == null) {
            const user = new User({ email: email, pseudo: pseudo, password: hashedPassword, roles: ["commonUser"] });
            user.save().then(userInfo => {
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
            res.status(401);
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


export  function logout(req, res) {
    res.cookie('token', '').send();
}