import UserSchema from "../models/UserSchema";
import DoctorSchema from "../models/DoctorSchema";
import BookingSchema from "../models/BookingSchema";


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
        const doctor = await DoctorSchema.findById(id).populate("reviews").select("-password");

        res.status(200).json({success: true, message: "User details", data: doctor});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}

export const getAllDoctor = async (req: any, res: any) => {
    const id = req.params.id;




    try {

        const {query} = req.query;

        let doctors;

        if(query) {
            doctors = await DoctorSchema.find({
                isApproved: "approved",
                $or: [
                    {name: {$regex: query, $options: " i"}},
                    {specialization: {$regex: query, $options: " i"}},
                ]
            }).select("-password");
        }else {
            doctors=await  DoctorSchema.find({isApproved: "approved"}).select("-password");
        }

        res.status(200).json({success: true, message: "User details", data: doctors});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}
export  const getDoctorProfile= async (req:any,res:any)=>{
    const doctorId=req.userId;

    try {

        const doctor:any=    await  DoctorSchema.findById(doctorId)


        if(!doctor){
            return res.status(404).json({success:false,message:"user Not Found"})
        }
        const {password,...rest}=doctor._doc
        const appointments= await  BookingSchema.find({doctor:doctorId})

        return res.status(200).json({success:true,message:"Profile info is getting",data:{...rest,appointments}});
    }catch (error){
        return res.status(500).json({success:false,message:"Not Found"})
    }


}