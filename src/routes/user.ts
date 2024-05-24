import express from "express";
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    getUserProfile,
    getAllMyAppointments
} from "../Controllers/userController";
import {restrict, verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.get("/find/:id",verifyToken,restrict(["patient"]),getSingleUser)
router.get("/findAll",verifyToken,restrict(["admin"]),getAllUser)
router.put("/update/:id",verifyToken,restrict(["patient"]),updateUser)
router.delete("/delete/:id",verifyToken,restrict(["patient"]),deleteUser)
router.delete("/profile/me",verifyToken,restrict(["patient"]),getUserProfile)
router.delete("/appointments/my-appointments",verifyToken,restrict(["patient"]),getAllMyAppointments)

module.exports=router