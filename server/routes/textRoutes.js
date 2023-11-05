import express from "express";
// import cityModel from "../models/cityModel.js";

const router = express.Router();

const addRoutes = () => {
  app.use("/api", router);
  // router.get("/test", (req, res) => {
  //   console.log("Hi!!");
  //   res.json({
  //     message: " hi back",
  //   });
  // });

  router.get("/post");
};
export default router;
