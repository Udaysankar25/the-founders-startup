import express from "express";
import {
  getConversations,
  getMessages,
  sendMessage,
  searchUsers,
  markAsRead,
  deleteMessageForMe,
  deleteMessageForEveryone,
  deleteConversation,
} from "../controllers/MessageController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(auth);

// Get all conversations for the user
router.get("/conversations", getConversations);

// Get messages for a specific conversation
router.get("/conversations/:conversationId", getMessages);

// Send a message (creates conversation if needed)
router.post("/send", sendMessage);

// Search users for new conversations
router.get("/search-users", searchUsers);

// Mark conversation as read
router.put("/conversations/:conversationId/read", markAsRead);

// Delete a message for me only
router.delete("/:messageId/for-me", deleteMessageForMe);

// Delete a message for everyone
router.delete("/:messageId/for-everyone", deleteMessageForEveryone);

// Delete entire conversation
router.delete("/conversations/:conversationId", deleteConversation);

export default router;
