import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
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

}