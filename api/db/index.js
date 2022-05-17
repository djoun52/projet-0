import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(process.env.MONDODB_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }).
    then(() => {
        console.log('db is connected');
    }).catch((err) => {
        console.log('db connection fail : ', err)
    })


const db = mongoose.connection;
db.on('error', console.log)