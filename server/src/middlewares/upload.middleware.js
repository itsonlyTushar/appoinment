import multer from "multer";

const storage = multer.memoryStorage();

// KEEP ONLY 2MB ALLOWED SIZE
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// FACTORY HELPER TO CREATE MULTER SINGLE-FILE MIDDLEWARES WITH CONSISTENT ERROR HANDLING
const createUploadMiddleware = (
  uploadInstance,
  fieldName,
  limitErrorMessage,
) => {
  const uploadHandler = uploadInstance.single(fieldName);

  return (req, res, next) => {
    uploadHandler(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: limitErrorMessage || "File size exceeds 2MB limit",
        });
      }
      if (err) {
        return res.status(err.statusCode || 400).json({ message: err.message });
      }
      next();
    });
  };
};

// ALLOWED FILE TYPES FOR MEDICAL REPORTS
const reportAllowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

// REPORTS UPLOAD CONFIGURATION
const reportsUpload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (reportAllowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error(
        "Invalid file type. Only image files JPEG, PNG, and PDF documents are allowed.",
      );
      error.statusCode = 400;
      cb(error, false);
    }
  },
});

// PROFILE PICTURE UPLOAD CONFIGURATION
const profileUpload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      const error = new Error(
        "Only image files are allowed for profile pictures.",
      );
      error.statusCode = 400;
      cb(error, false);
    }
  },
});

// EXPORTED MIDDLEWARES
export const uploadReports = createUploadMiddleware(
  reportsUpload,
  "reports",
  "File size exceeds 2MB limit",
);

export const uploadProfilePicture = createUploadMiddleware(
  profileUpload,
  "profilePicture",
  "Profile picture exceeds 2MB limit",
);

export default uploadReports;
