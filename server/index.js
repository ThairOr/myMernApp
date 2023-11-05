import express from "express";
import colors from "colors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";
import commentsRoutes from "./routes/commentsRoute.js";
import postsRoutes from "./routes/postsRoutes.js";
import passport from "passport";

import userRoutes from "./routes/userRoutes.js";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";
import router from "./routes/commentsRoute.js";
import PassportConfig from "./config/passport.js";

const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  //3. initialize passport
  passport.initialize();
  //4. call function that loads our own setup on Passport
  PassportConfig(passport);
};

const middleware = (req, res, next) => {
  console.log("here is the middle");
  next();
};

const addRoutes = () => {
  app.get("/test", middleware, (req, res) => {
    res.send("here we are");
  });
  app.use("/api", router);
  app.use("/api/comment", commentsRoutes);
  app.use("/api/post", postsRoutes); // check  spelling of names
  app.use("/api/users", userRoutes);
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB,
      console.log("connected to MongoDB".bgBlue)
    );
  } catch (error) {
    console.log("error connecting to mongoDB!!! :>> ", error);
  }
};

const startServer = () => {
  const port = process.env.PORT || 5005;
  app.listen(port, () => {
    console.log(`server is running on port :${port}`.bgGreen, port);
  });
};

(async function controller() {
  //connect to MongoDB gives permissions
  await connectToMongoDB();
  addMiddlewares();
  addRoutes();
  startServer();
})();
