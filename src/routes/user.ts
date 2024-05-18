import express from "express";
import {updateUser,deleteUser,getAllUser,getSingleUser} from "../Controllers/userController";

const router = express.Router();

router.get("/find/:id",getSingleUser)
router.get("/findAll",getAllUser)
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)

module.exports=router