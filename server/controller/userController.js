import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/passwordServices.js";
import { generateToken } from "../utils/tokenServices.js";

const imageUpload = async (req, res) => {
  console.log("req.file :>> ", req.file);
  if (req.file) {
    //if there is a field called "file" in the request, we trz to upload file to cloudinary
    console.log(req.file);
    try {
      const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "travelApp",
      });
      console.log("uploadedImage :>>", uploadedImage);
      res.status(200).json({
        message: "Upload successfull",
        imageUrl: uploadedImage.secure_url,
      });
      //if uploadedImage is succesful (return a valid object), save that URL into the
    } catch (error) {
      res.status(500).json({
        message: "File not uploaded",
        error: error,
      });
      console.log("error :>> ", error);
    }
  }
};

const register = async (req, res) => {
  //recieve all the newUser information (sent by the client) in the body of the request
  //process that information and store in the datbase
  console.log("req.body:>>", req.body);
  //const (userName, email,userImage, password) = req.body // destructured version
  //Hash a new password

  try {
    const hashedPassword = await hashPassword(req.body.password);
    if (hashedPassword) {
      //check if user exist already

      const existingUser = await userModel.findOne({ email: req.body.email });

      if (existingUser) {
        res.status(200).json({
          message: "email already exist in the database",
        });
      } else {
        //if no existing user, we save the new user
        try {
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            // signupTime: user.signupTime,
            userImage: req.body.userImage ? req.body.userImage : undefined,
          });

          const savedUser = await newUser.save();
          res.status(201).json({
            msg: "new user registered",
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              userImage: savedUser.userImage,
              // signupTime: savedUser.signupTime,
            },
          });
        } catch (error) {
          console.log("error saving user :>> ", error);
          res.status(500).json({
            msg: "something went wrong registering the user",
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      msg: "something went wrong",
    });
  }
};
const login = async (req, res) => {
  console.log("login runnin");
  console.log("req.body :>> ", req.body);
  // 1.receive email and password in the request
  //2.check that there is at least one user with the same email stored in the DB

  try {
    // const existingUser = await userModel.findOne({ email: req.body.email });
    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("exisitingUser>>>>", existingUser);
    if (!existingUser) {
      //if it dosn't send appropiate response to the client
      res.status(404).json({
        msg: "no user found with this email",
      });
    } else {
      //if user exist is our DB
      //check password
      const checkPassword = await verifyPassword(
        req.body.password,
        existingUser.password
      );
      console.log("checkPassword", checkPassword);
      if (!checkPassword) {
        //this means received password do not match the one in the DB
        res.status(404).json({
          msg: "wrong password, try again",
        });
      }
      if (checkPassword) {
        //email exists in our DB, and password is correct

        //Generate token
        const token = generateToken(existingUser._id);
        if (token) {
          //all is ok: email exists, password is correct, and token is generated

          res.status(200).json({
            msg: "login success",
            user: {
              _id: existingUser._id,
              userName: existingUser.userName,
              email: existingUser.email,
              userImage: existingUser.userImage,
              bio: existingUser.bio,
              signupTime: existingUser.signupTime,
              // signupTime: user.signupTime,
            },
            token,
          });
        } else {
          console.log("error generating token");
          res.status(400).json({
            msg: "somthing went wrong with your request",
          });
        }
        // Error "cannot set headers after they are sent to the client" is because in this if block, when Token exists, you send the response inside the if(token),but you sent also the response below.
        // res.status(200).json({
        //   msg: "you are logged in",
        // });
      }
    }
  } catch (error) {
    // console.log("error-----", error);
    console.log("error>>>>", error);
    res.status(500).json({
      msg: "I don't have a clue",
    });
  }
};

const getProfile = (req, res) => {
  console.log("get Profile".bgMagenta);
  console.log("req:>>".rainbow, req);
  if (req.user) {
    res.status(200).json({
      user: {
        userName: req.user.userName,
        email: req.user.email,
        userImage: req.user.userImage,
        bio: req.user.bio,
        signupTime: req.user.signupTime,
      },
    });
  }
  if (!req.user) {
    res.status(200).json({
      msg: "you need to login again",
    });
  }
};

const checkUserStatus = async (req, res) => {
  const { user } = req;

  if (user) {
    res.status(200).json({
      message: "user is logged in",
      user: {
        id: user._id,
        email: user.email,
        userImage: user.userImage,
        userName: user.userName,
        signupTime: user.signupTime,
        bio: user.bio,
      },
    });
  } else {
    res.status(400).json({ message: "user is not logged in" });
  }
};
// deleteUser

const deleteUser = async (req, res) => {
  const userId = req.params._id;
  console.log(req.params);
  try {
    if (!userId) {
      return res.status(400).json({
        msg: "userId is required in the URL parameter",
      });
    }

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        msg: " User not found",
      });
    }

    res.status(200).json({
      msg: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  // console.log("req.user :>> ", req.user);
  // console.log("req.body :>> ", req.body);

  const { userName, email, userImage, password, _id } = req.body;
  // const id = req.user._id;

  try {
    const updatedFields = {};
    if (userName) {
      const existingUsername = await userModel.findOne({ userName: userName });
      if (existingUsername === userName) {
        return res
          .status(400)
          .json({ errors: { msg: "Username already in use" } });
      }
      updatedFields.userName = userName;
    }
    if (email) {
      const existingEmail = await userModel.findOne({ email: email });
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (existingEmail && email !== req.user.email) {
        return res
          .status(400)
          .json({ errors: { msg: "Email already in use" } });
      }
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json({ errors: { msg: "email address is invalid" } });
      }
      updatedFields.email = email;
    }
    if (userImage) {
      updatedFields.userImage = userImage;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          errors: { msg: "password should be at least 6 characters" },
        });
      }
      const hashedPassword = await passwordEncryption(req.body.password);
      updatedFields.password = hashedPassword;
    }
    const updatedUser = await userModel.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    return res
      .status(200)
      .json({ msg: "Update successful", user: updatedUser });
  } catch (error) {
    // console.log("error", error);
    res.status(500).json({ msg: "Error updating info", error: error });
  }
};

export {
  imageUpload,
  register,
  login,
  getProfile,
  checkUserStatus,
  updateUser,
  deleteUser,
};
