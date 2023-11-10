import {
  CreateComment,
  deleteComment,
  getAllComments,
} from "../controller/commentsController.js";
import { getCommentsByUserId } from "../controller/postsController.js";
import express from "express";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.get("/all", getAllComments);
router.get("/:user", getCommentsByUserId);
router.post("/posts/:_id", jwtAuth, CreateComment);
router.delete("/deleteComment", deleteComment);
export default router;
