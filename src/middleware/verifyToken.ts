import {NextFunction} from "express";
import process from "process";
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