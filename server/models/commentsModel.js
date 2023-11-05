import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  message: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});
const commentsModel = mongoose.model("comment", commentsSchema);

export default commentsModel;
