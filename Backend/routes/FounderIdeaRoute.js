import express from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  toggleLike,
  addComment,
  deleteComment,
  addReplyToComment,
  getUserIdeas,
  uploadIdeaAttachment,
} from "../controllers/FounderIdeaController.js";
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
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit (increased from 10MB)
  },
});

// All routes are protected with authentication
router.use(auth);

// File upload routes with error handling
router.post(
  "/upload/:type",
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "File too large. Maximum size is 50MB.",
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
  uploadIdeaAttachment
);

// CRUD operations
router.post("/", createIdea);
router.get("/", getIdeas);
router.get("/:id", getIdeaById);
router.put("/:id", updateIdea);
router.delete("/:id", deleteIdea);

// Social interactions
router.post("/:id/like", toggleLike);
router.post("/:id/comment", addComment);
router.post("/:id/comment/:commentId/reply", addReplyToComment);
router.delete("/:id/comment/:commentId", deleteComment);

// User specific
router.get("/user/:userId", getUserIdeas);

export default router;
