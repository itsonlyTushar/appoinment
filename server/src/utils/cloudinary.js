import { v2 as cloudinary } from "cloudinary";

// INITIALIZE CLOUDINARY CONFIG
const getCloudinaryConfig = () => ({
  cloud_name: process.env.CLOUDINARY_USER,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_KEY_SECRET,
  secure: true,
});

cloudinary.config(getCloudinaryConfig());

// UPLOAD REPORT TO CLOUDINARY
export const uploadToCloudinary = (buffer, folder = "doctor-appointment/reports") => {
  cloudinary.config(getCloudinaryConfig());

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
};

export default cloudinary;
