import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  userImage: {
    type: String,
    default: "https://i.stack.imgur.com/l60Hf.png",
  },
  signupTime: {
    type: Date,
    default: Date.now,
  },

  bio: {
    type: String,
  },

  saved: [
    {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
    },
  ],
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
