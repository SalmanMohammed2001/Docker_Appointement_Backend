import express from "express";
import {updateDoctor,deleteDoctor,getAllDoctor,getSingleDoctor} from "../Controllers/doctorController";

const router = express.Router();

router.get("/find/:id",getSingleDoctor)
router.get("/findAll",getAllDoctor)
router.put("/update/:id",updateDoctor)
router.delete("/delete/:id",deleteDoctor)

module.exports=router
