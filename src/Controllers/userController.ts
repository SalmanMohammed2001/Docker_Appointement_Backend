import UserSchema from "../models/UserSchema";
import BookingSchema from "../models/BookingSchema";
import DoctorSchema from "../models/DoctorSchema";


export const updateUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const updateUser = await UserSchema.findByIdAndUpdate(id, {$set: req.body}, {new: true});

        res.status(200).json({success: true, message: "Successfully Update", data: updateUser});
    } catch (err) {
        res.status(500).json({success: false, message: "Internal server error"})
    }

}


export const deleteUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
    await UserSchema.findByIdAndDelete(id);

        res.status(200).json({success: true, message: "Successfully delete"});
    } catch (err) {
        res.status(500).json({success: false, message: "Internal server error"})
    }

}

export const getSingleUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const user = await UserSchema.findById(id).select("-password");

        res.status(200).json({success: true, message: "User details", data: user});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}

export const getAllUser = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const users = await UserSchema.find({}).select("-password");

        res.status(200).json({success: true, message: "User details", data: users});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}

export  const getUserProfile= async (req:any,res:any)=>{
    const userId=req.userId;

    try {

    const user:any=    await  UserSchema.findById(userId)

        if(!user){
            return res.status(404).json({success:false,message:"user Not Found"})
        }
        const {password,...rest}=user._doc

        return res.status(200).json({success:true,message:"Profile info is getting",data:{...rest}});
    }catch (error){
        return res.status(500).json({success:false,message:"Not Found"})
    }


}

export  const  getAllMyAppointments= async (req:any,res:any)=>{


    try{

        //step 1 :retrieve   appointment from booking for specific  user
        const bookings= await   BookingSchema.find({user:req.userId})

        //step 2 : extract doctor id  from appointment booking
        // @ts-ignore
        const doctorIds= bookings.map(el=>el.doctor.id)

        //step 3 :retrieve   doctors  using doctor ids
        const doctor= await  DoctorSchema.find({_id: {$in:doctorIds}}).select('-password');

        return res.status(200).json({success:true,message:"Appointments are getting",data:doctor});
    }catch (error){
        return res.status(500).json({success:false,message:"Not Found"})
    }

}

