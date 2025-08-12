import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
} from "../controllers/NotificationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(auth);

// Get all notifications for the user
router.get("/", getNotifications);

// Get unread notification count
router.get("/unread-count", getUnreadCount);

// Mark a notification as read
router.put("/:id/read", markAsRead);

// Mark all notifications as read
router.put("/read-all", markAllAsRead);

// Delete a notification
router.delete("/:id", deleteNotification);

export default router;
