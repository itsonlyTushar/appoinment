import multer from "multer";

// MEMORY STORAGE FOR HANDLING FILE UPLOADS IN MEMORY
const storage = multer.memoryStorage();

// ALLOWED FILE TYPES FOR MEDICAL REPORTS
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
];

// FILTER INCOMING FILES BY EXTENSION / TYPE
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(
      "Invalid file type. Only image files JPEG, PNG, and PDF documents are allowed.",
    );
    error.statusCode = 400;
    cb(error, false);
  }
};

// INITIALIZE MULTER WITH 2MB SIZE LIMIT
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter,
});

// MIDDLEWARE TO HANDLE MEDICAL REPORT UPLOAD
export const uploadReports = (req, res, next) => {
  const uploadHandler = upload.single("reports");

  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size exceeds 2MB limit",
        });
      } else {
        return res.status(400).json({ message: err.message });
      }
    } else if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    next();
  });
};

export default uploadReports;
