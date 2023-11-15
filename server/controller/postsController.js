import postsModel from "../models/postsModel.js";
import userModel from "../models/userModel.js";
import commentsModel from "../models/commentsModel.js";

// const getPost = async (req, res) => {
//   console.log("get single post");
//   const id = req.params._id;
//   console.log("PostID---->", id);
//   try {
//     const postById = await postsModel.findById(id).populate({
//       path: "comments",
//       populate: {
//         path: "user",
//         select: ["email", "userName", "userImage"],
//       },
//     });

//     console.log("postById=====>", postById);
//     // if (postById.length < 1) {
//     //   res.status(200).json({ message: "no post matches" });
//     // } else {
//     //   res.status(200).json(postById);
//     // }
//     if (postById) {
//       res.status(200).json(postById);
//     } else {
//       res.status(200).json({ message: "no post matches" });
//     }
//   } catch (error) {
//     console.log("error :>> ".bgRed, error);
//     res.status(500).json({
//       error: "something went wrong in the server",
//     });
//   }
// };

const getPost = async (req, res) => {
  console.log("get single post");
  const id = req.params._id;
  console.log("PostID---->", id);
  try {
    const postById = await postsModel.findById(id).populate({
      path: "comments",
      populate: {
        path: "user",
        select: ["email", "userName"],
      },
    });

    console.log("postById=====>", postById);

    if (postById) {
      res.status(200).json(postById);
    } else {
      res.status(200).json({ message: "no post matches" });
    }
  } catch (error) {
    console.log("error :>> ".bgRed, error);
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
};

const getAllPosts = async (req, res) => {
  console.log("get all comment");
  try {
    const allPost = await postsModel.find().populate({
      path: "comments",
      select: [
        "image",
        "location",
        "user",
        "captions",
        "likes",
        "comment",
        "saved_by",
        "time",
      ],
    });

    if (allPost.length < 1) {
      res.status(200).json({ message: "no posts stored" });
    } else {
      res.status(200).json({
        number: allPost.length,
        allPost,
      });
    }
  } catch (error) {
    console.log("error :>> ".bgRed, error);
    res.status(500).json({
      error: "something went wrong in the server",
    });
  }
};

// !THIS FUNCTION GETS CALLED WHEN WE TRY TO CALL SINGLE POST
const getCommentsByUserId = async (req, res) => {
  console.log("get single post");
  const { comments } = req.params;
  const { likes } = req.query;

  if (likes) {
    try {
      const posts = await allPost.find({
        comments: comments,
        likes: { $gte: likes },
      });
      res.status(200).json({
        number: posts.length,
        posts,
      });
    } catch (error) {}
  } else {
    try {
      const posts = await postsModel.find({ comments: comments });
      if (posts.length > 0) {
        res.status(200).json({
          number: posts.length,
          posts,
        });
      } else {
        res.status(200).json({
          number: posts.length,
          posts,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        errorMessage: "something went wrong in the request",
        error,
      });
    }
  }
};
// 2. create a controller function to create a new post. It will work similar to the register user : in the body of the request, (req.body),
//TODO change function name to something like "createComment" , "saveComment"
const createPost = async (req, res) => {
  console.log("req.body", req.body);

  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser :>>", existingUser);
    if (existingUser) {
      try {
        const newSubmission = new postsModel({
          image: req.body.image,
          location: {
            country: req.body.country,
            city: req.body.city,
          },
          user: existingUser._id,
          time: req.body.time,
          title: req.body.title,
          captions: req.body.captions,
          story: req.body.story,
          //TODO if you want to also add "story" to the new post, add that to the model , and use it here
          comments: req.body.comments,
          saved_by: req.body.saved_by,
        });
        // save this Data newSubmission.save()
        const savedSubmission = await newSubmission.save();
        console.log("savedSubmission", savedSubmission);
        res.status(201).json({
          message: "Post posted successfully",
          submission: savedSubmission,
        });
      } catch (error) {
        console.log("error when trying to submit an experience: ", error);
        res.status(500).json({
          message: "Something went wrong when trying to post an experience",
        });
      }
    } else {
      res.status(401).json({
        message: "You need to be logged in to submit an experience",
      });
    }
  } catch (error) {
    console.log("Catch error: ", error);
    res.status(500).json({
      message: "Oh no! Something went wrong!",
    });
  }
};

const deletePost = async (req, res) => {
  const { idPostToDelete } = req.body;
  const { user } = req;
  console.log("req.body", req.body);
  try {
    // fin post to delete
    const deletedPost = await postsModel.findByIdAndRemove(idPostToDelete);
    console.log("deletedPost", deletedPost);
    if (deletedPost) {
      res.status(200).json({
        message: "post deleted",
      });
    }
  } catch (error) {
    console.log("error deleting post", error);
    res.status(400).json({
      message: "cannot delete Post",
    });
  }
};

export { getAllPosts, getCommentsByUserId, createPost, getPost, deletePost };
