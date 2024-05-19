import express from "express";
import {getAllReview,createReview} from "../Controllers/reviewController";
import {restrict, verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.route('/').get(getAllReview).post(verifyToken,restrict(["patient"]),createReview)

module.exports=router