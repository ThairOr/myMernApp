import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  /// Note from raul : think about if you want your posts to contain also a date or not
  // date: {
  //   type: Date,
  //   required:true
  // },
  // location is required. how are you gonna find out the location when the user post a comment?

  location: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likes: {
    type: Number,
  },
  title: {
    type: String,
  },
  captions: {
    type: String,
  },
  comments: [
    {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
    },
  ],
  saved_by: [
    {
      type: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

const postsModel = mongoose.model("post", postsSchema);

export default postsModel;
