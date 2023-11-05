import express from "express";
import {
  getProfile,
  imageUpload,
  login,
  register,
} from "../controller/userController.js";
import multer from "multer";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), imageUpload);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);

export default router;
