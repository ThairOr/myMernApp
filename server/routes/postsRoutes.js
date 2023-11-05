import express from "express";
import {
  getAllPosts,
  submitPost,
  getPost,
} from "../controller/postsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/:_id", getPost);
//1. Create the endpoint in postsRoute. The endpoint should be a post route, and authenticated (initially for testing, dont add jwtauth , try first the controller function)
router.post("/postsubmission", submitPost);

export default router;
