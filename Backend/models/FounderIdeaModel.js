import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the comment schema first
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "Comment cannot exceed 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add the replies field after the schema is defined
commentSchema.add({
  replies: [commentSchema],
});

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    funding: {
      type: Number,
      min: [0, "Funding amount cannot be negative"],
      default: null,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [20, "Tag cannot exceed 20 characters"],
      },
    ],
    coverImage: {
      type: String,
      default: null,
    },
    pitchDeck: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
ideaSchema.index({ author: 1, createdAt: -1 });
ideaSchema.index({ tags: 1 });
ideaSchema.index({ status: 1, isPublic: 1 });

// Virtual for like count
ideaSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Virtual for comment count
ideaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Ensure virtuals are serialized
ideaSchema.set("toJSON", { virtuals: true });
ideaSchema.set("toObject", { virtuals: true });

// Add pagination plugin
ideaSchema.plugin(mongoosePaginate);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;
