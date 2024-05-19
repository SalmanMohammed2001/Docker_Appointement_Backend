import express from "express";
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor} from "../Controllers/doctorController";
import {verifyToken} from "../middleware/verifyToken";

const router = express.Router();

router.get("/find/:id",verifyToken,getSingleDoctor)
router.get("/findAll",verifyToken,getAllDoctor)
router.put("/update/:id",verifyToken,updateDoctor)
router.delete("/delete/:id",verifyToken,deleteDoctor)

module.exports=router
