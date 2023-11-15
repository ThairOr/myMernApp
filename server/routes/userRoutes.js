import express from "express";
import {
  checkUserStatus,
  deleteUser,
  getProfile,
  imageUpload,
  login,
  register,
  updateUser,
} from "../controller/userController.js";
import multer from "multer";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post("/imageUpload", multerUpload.single("userImage"), imageUpload);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", jwtAuth, getProfile);
router.get("/checkUserStatus", jwtAuth, checkUserStatus);
router.post("/updateuser", updateUser);
router.delete("/deleteuser/:_id", jwtAuth, deleteUser);
export default router;
