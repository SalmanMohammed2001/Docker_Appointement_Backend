import mongoose from "mongoose";
import express from 'express'
import  process from "process";
import bodyParser from "body-parser";

var cookieParser = require('cookie-parser')
const cors = require('cors')

const dotenv=require('dotenv')
dotenv.config({ path: 'src/.env' });

const app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())


let port=process.env.SERVER

mongoose.connect('mongodb://127.0.0.1:27018/doctor_appointment').then(()=>{
    app.listen(port,()=>{
        console.log(`serve running ${8080}`)

    })
})

const authRoute=require('./routes/auth')
const  userRoute=require('./routes/user');
const  doctorRoute=require('./routes/doctors');
const  reviewRoute=require('./routes/review');

/*==============================*/
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/doctors",doctorRoute)
app.use("/api/v1/reviews",reviewRoute)
/*==============================*/

