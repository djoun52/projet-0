import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import cors from "cors"
import jwt from 'jsonwebtoken';

const secret = "secret123";

await mongoose.connect('mongodb+srv://Mernadmin:Bh8O42qgwLTAuqAl@merndb.v5ytp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.log)


const app = express();

const port= process.env.PORT || 4000;
app.use(cookieParser());
app.use(bodyParser.json({extended: true}));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))

app.get('/', (req, res)=>{
    res.send({body : "ok"});
})

app.post('/register', (req, res) =>{
    const {email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email: email, password: hashedPassword});
    user.save().then(userInfo => {
        jwt.sign({id: userInfo._id, email: userInfo.email}, secret, (err, token) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.cookie('token', token).json({id: userInfo._id , email: userInfo.email  });
            }
        })
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});