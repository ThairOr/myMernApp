import commentsModel from "../models/commentsModel.js";
import postsModel from "../models/postsModel.js";
import userModel from "../models/userModel.js";

const getAllComments = async (req, res) => {
  const allComments = await commentsModel
    .find()
    .populate(
      { path: "user", select: ["name", "email"] },
      { path: "commentpost", select: ["_id"] }
    );

  res.json({
    number: allComments.length,
    allComments,
  });
};

const CreateComment = async (req, res) => {
  // حتى يتصل بالروتير الاي دي
  const CommentPostID = req.params._id;
  console.log("CommentPostID :>> ", CommentPostID);
  console.log("req.user :>> ", req.user);
  console.log("req.body :>> ", req.body);

  try {
    //  المستخدم موجود من لاقيه من الايميل
    // const existingUser = await userModel.findOne({ email: req.body.email });
    // console.log("existingUser :>> ", existingUser);
    // اذا انوجد
    // if (existingUser) {
    try {
      // موجد متغير للمحادثة جديده
      const newComment = new commentsModel({
        user: req.user._id,
        message: req.body.message,
        posts: CommentPostID,
        email: req.user.email,
      });
      // من منحفظها
      const savedComment = await newComment.save();
      // وبعدين برفع البوست و بيدفش المحادثة و بحفظها
      const posts = await postsModel.findOneAndUpdate(
        { _id: CommentPostID },
        {
          $push: {
            comments: {
              $each: [savedComment],
            },
          },
        },
        { new: true }
      );

      res.status(201).json({
        message: "Comment posted successfully",
        comment: savedComment,
      });
    } catch (error) {
      console.error("error leaving comment:", error);
      res.status(500).json({
        message: "Something went wrong when trying to leave a comment",
      });
    }
    // } else {
    //   res.status(401).json({
    //     message: "You need to be logged in to leave a comment",
    //   });
    // }
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({
      message: "Oh no! Something went wrong!",
    });
  }
};
const deleteComment = async (req, res) => {
  const { idCommentToDelete } = req.body;
  const { user } = req;
  console.log("req.body", req.body);
  try {
    // fin comment to delete
    const deletedPost = await postsModel.findByIdAndRemove(idCommentToDelete);
    console.log("deleteComment", deleteComment);
    if (deleteComment) {
      res.status(200).json({
        message: "delete comment",
      });
    }
  } catch (error) {
    console.log("error deleting post", error);
    res.status(400).json({
      message: "cannot delete comment",
    });
  }
};

export { getAllComments, CreateComment, deleteComment };
