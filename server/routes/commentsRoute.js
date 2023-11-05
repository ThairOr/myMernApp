import { getAllComments } from "../controller/commentsController.js";
import { getCommentsByUserId } from "../controller/postsController.js";
import express from "express";

const router = express.Router();

router.get("/all", getAllComments);
router.get("/:user", getCommentsByUserId);

export default router;
