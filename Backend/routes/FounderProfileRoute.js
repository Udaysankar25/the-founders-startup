import express from "express";
import {
  getFounderProfile,
  updateFounderProfile,
  uploadFounderProfilePicture,
  uploadFounderProfileBackground,
  getFounderProfileById,
} from "../controllers/FounderProfileController.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for profile pictures
  },
});

// Profile routes
router.get("/profile", auth, getFounderProfile);
router.put("/profile", auth, updateFounderProfile);
router.post(
  "/profile/picture",
  auth,
  (req, res, next) => {
    upload.single("picture")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large. Maximum size is 10MB.",
          });
        }
        return res.status(400).json({
          message: "File upload error: " + err.message,
        });
      } else if (err) {
        return res.status(400).json({
          message: "File upload error: " + err.message,
        });
      }
      next();
    });
  },
  uploadFounderProfilePicture
);
router.post(
  "/profile/background",
  auth,
  (req, res, next) => {
    upload.single("background")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large. Maximum size is 10MB.",
          });
        }
        return res.status(400).json({
          message: "File upload error: " + err.message,
        });
      } else if (err) {
        return res.status(400).json({
          message: "File upload error: " + err.message,
        });
      }
      next();
    });
  },
  uploadFounderProfileBackground
);
router.get("/profile/:id", auth, getFounderProfileById);

export default router;
