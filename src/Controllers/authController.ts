import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
import userSchema from "../models/UserSchema";
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')





const generateToken=(user:any)=>{
    return jwt.sign({id:user._id,role:user.role,email:user.email},process.env.JWT_SERCET_KEY,{
        expiresIn:"15d",
    })
}


export const register =  async (req:any, res:any) => {
    try {

        const{email,password,name,role,photo,gender}=req.body

      let user=null;

        if(role == "patient"){
         user = await  UserSchema.findOne({email:email});
        }
        if(role == "doctor"){
            user = await  DoctorSchema.findOne({email:email});
        }

        if(user){
            res.status(400).json({message:"User Already exist"})
        }

        const salt=await  bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt)

        if(role == 'patient'){
           user=  new UserSchema({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role==="doctor"){

            user=new DoctorSchema({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }
        await user?.save()

        res.status(200).json({success:true,message:"User Successfully created"})


    }catch (error) {
        res.status(500).json({success:false,message:"Internal server error"})
    }

}

export const login = async  (req:any, res: any) => {

    try{
        // @ts-ignore
       // const {email,password}=req.body

        let user=null;

        const patient= await  userSchema.findOne({email:req.body.email});
        const doctor= await  DoctorSchema.findOne({email:req.body.email});

        if(patient){
            user=patient;
        }else if(doctor){
            user=doctor;
        }

        if(!user){
            res.status(400).json({message:"User not found"})
        }

        const isPassword=await bcrypt.compare(req.body.password, user?.password);
        if(!isPassword){
            res.status(401).json({message:"invalid  credentials"})
        }

        const  token=generateToken(user)

        // @ts-ignore

        const {password,role,appointments,...rest}=user._doc

        res.setHeader("Authorization",`Bearer ${token}`)
        res.status(200).json({status:true,message:"Successful login",token,data:rest,role})

    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"})

    }
}