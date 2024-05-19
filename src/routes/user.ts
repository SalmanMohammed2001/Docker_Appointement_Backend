import express from "express";
import {updateUser,deleteUser,getAllUser,getSingleUser} from "../Controllers/userController";
import {restrict, verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.get("/find/:id",verifyToken,restrict(["patient"]),getSingleUser)
router.get("/findAll",verifyToken,restrict(["admin"]),getAllUser)
router.put("/update/:id",verifyToken,restrict(["patient"]),updateUser)
router.delete("/delete/:id",verifyToken,restrict(["patient"]),deleteUser)

module.exports=router