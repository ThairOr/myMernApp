import commentsModel from "../models/commentsModel.js";

const getAllComments = async (req, res) => {
  const allComments = await commentsModel
    .find()
    .populate({ path: "user", select: ["name", "email"] });

  res.json({
    number: allComments.length,
    allComments,
  });
};

export { getAllComments };
