import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from './routes/user.js'
import  './db/index.js'



const app = express();

const port = process.env.PORT || 4000;

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}))
app.get('/', (req, res) => {
    res.send({ body: "ok" });
})
app.use(userRouter)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});