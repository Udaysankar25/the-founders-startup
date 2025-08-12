import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null for system notifications
    },
    type: {
      type: String,
      enum: [
        "comment", // Someone commented on your idea
        "like", // Someone liked your idea
        "follow", // Someone started following you
        "team_invite", // Someone invited you to join their team
        "investment", // Investment related notification
        "profile_view", // Someone viewed your profile
        "message", // New message received
        "system", // System notifications
        "idea_mention", // Someone mentioned you in an idea
        "funding_update", // Funding status update
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create indexes for better performance
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);
