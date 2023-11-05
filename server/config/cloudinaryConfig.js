import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = () => {
  console.log("CLOUDNAME :>> ", process.env.CLOUDNAME);
  console.log("process.env.APIKEY :>> ", process.env.APIKEY);
  console.log("process.env.APISECRET :>> ", process.env.APISECRET);

  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET,
    secure: true,
  });
};

export { cloudinaryConfig };
