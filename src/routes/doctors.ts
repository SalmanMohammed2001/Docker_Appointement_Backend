import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile
} from "../Controllers/doctorController";
import {restrict, verifyToken} from "../middleware/verifyToken";

const router = express.Router();


/**==============================**/

const  reviewRoute=require('../routes/review');

//nested routes

router.use('/:doctorId/reviews',reviewRoute);

/*==============================*/

router.get("/find/:id",verifyToken,getSingleDoctor)
router.get("/findAll",verifyToken,getAllDoctor)
router.put("/update/:id",verifyToken,restrict(["doctor"]),updateDoctor)
router.delete("/delete/:id",verifyToken,restrict(["doctor"]),deleteDoctor)
router.get("/profile/me",verifyToken,restrict(["doctor"]),getDoctorProfile)

module.exports=router
