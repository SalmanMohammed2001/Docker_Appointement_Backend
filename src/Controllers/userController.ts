import UserSchema from "../models/UserSchema";


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