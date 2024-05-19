import express from "express";
import {updateUser,deleteUser,getAllUser,getSingleUser} from "../Controllers/userController";
import {verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.get("/find/:id",verifyToken,getSingleUser)
router.get("/findAll",verifyToken,getAllUser)
router.put("/update/:id",verifyToken,updateUser)
router.delete("/delete/:id",verifyToken,deleteUser)

module.exports=router