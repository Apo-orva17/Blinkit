import express from 'express'
import cors from 'cors'//connecting frontend and backend as they will be running on different ports
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet, { crossOriginResourcePolicy } from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './routes/user.route.js'

const app=express();
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy:false
    //since frontend and backend are on different origins this feild must be false
    //else it will cause conflicts
}))

const PORT = 8080 || process.env.PORT;
//we have taken a constant named PORT to run the backend on port number 8080
//but if the 8080 port is busy then it will automatically take up a random port value

app.get('/', (req, res)=>{
    res.send("Hello from backend "+ PORT);
})

connectDB().then(()=>{
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
});//connecting to mongodb database

//register user
app.use(`/api/user`, userRouter)