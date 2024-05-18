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
