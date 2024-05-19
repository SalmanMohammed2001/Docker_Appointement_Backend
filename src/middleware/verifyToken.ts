import {NextFunction} from "express";
import process from "process";
import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
const jwt=require('jsonwebtoken')

 export  const verifyToken = (req: any, res: any, next: any) => {
    const authToken = req.headers.authorization;

    if(!authToken || !authToken.startsWith("Bearer ")) {
        return res.status(401).json({success:false,message:"Invalid token"});
    }

    try {

        const token=authToken.split(" ")[1]
        const decodedData=jwt.verify(token,process.env.JWT_SERCET_KEY)
        req.userId=decodedData.id
        req.role=decodedData.role
        next()

    }catch (error){
        return res.status(401).json({success:false,message:"Internal server error"})
    }
}

export  const restrict = (roles: unknown[])=> async (req:any,res:any,next:any) => {
    const userId=req.userId

    let user;

    const patient=  await  UserSchema.findById(userId);
    const doctor=  await DoctorSchema.findById(userId);

    if(patient){
        user=patient
    }
    if(doctor){
        user=doctor;
    }

    if(!roles.includes(user?.role)){
        return res.status(401).json({success:false,message:"Invalid role"})
    }

    next();

}