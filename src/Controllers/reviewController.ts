import UserSchema from "../models/UserSchema";
import ReviewSchema from "../models/ReviewSchema";
import DoctorSchema from "../models/DoctorSchema";



export const getAllReview = async (req: any, res: any) => {
    const id = req.params.id;

    try {
        const review = await ReviewSchema.find({})

        res.status(200).json({success: true, message: "Successful", data: review});
    } catch (err) {
        res.status(404).json({success: false, message: "Internal server error"})
    }

}

export const createReview = async (req: any, res: any) => {

    if (!req.body.doctor) {
        req.body.doctor = req.params.doctorId;
    }
    if(!req.body.user){
        req.body.user = req.userId   // verify token get user id
    }

    try{

        const newReview= new ReviewSchema(req.body);

        const savedReview=await   newReview.save();

        //DoctorSchema review property set Review data
        await DoctorSchema.findByIdAndUpdate(req.body.doctor,{
            $push:{reviews: savedReview._id}
        })

        res.status(200).json({success:true,message:"Successfully created review"})

    }catch (error){
        res.status(400).json({message:"Internal server error"})
    }
}

