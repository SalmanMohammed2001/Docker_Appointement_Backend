import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";


export const updateDoctor = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const updateDoctor = await DoctorSchema.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(200).json({success: true, message: "Successfully Update", data: updateDoctor});
    } catch (err) {
        res.status(500).json({success: false, message: "Internal server error"})
    }

}


export  const deleteDoctor=(req:any,res:any)=>{

    const id=req.params.id



    try{

        DoctorSchema.findByIdAndDelete({'_id':id}).then((deleteUser)=>{
            if(deleteUser){
                res.status(200).json({success:true,message:"Successfully delete",data:deleteUser})
            }else {
                res.status(500).json({status:false,message:'Try again delete fail ' })
            }
        })


    }catch (error){
        res.status(500).json({success:false,message:"Internal server error"})
    }

}

export const getSingleDoctor = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const doctor = await DoctorSchema.findById(id).select("-password");

        res.status(200).json({success: true, message: "User details", data: doctor});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}

export const getAllDoctor = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const doctors = await DoctorSchema.find({}).select("-password");

        res.status(200).json({success: true, message: "User details", data: doctors});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}