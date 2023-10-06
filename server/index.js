import express from "express";
import colors from "colors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import cors from "cors";

import router from "./routes/testRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/callCenter", router);

const port = process.env.PORT || 5000;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB,
      console.log("connected to MongoDB".bgBlue)
    );
  } catch (error) {
    console.log("error connecting to mongoDB :>> ", error);
  }
};
connectToMongoDB();
app.listen(port, () => {
  console.log("server is running on port".bgGreen, port);
});
