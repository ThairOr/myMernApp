import multer from "multer";
import path from "path";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  const extantion = path.extname(file.originalname);

  if (extantion !== ".png" && extantion !== ".jpg" && extantion !== ".jpeg") {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;
