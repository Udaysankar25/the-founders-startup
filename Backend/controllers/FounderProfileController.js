import User from "../models/SignupModel.js";
import multer from "multer";
import Idea from "../models/FounderIdeaModel.js";

// GET /api/founder/profile - Get current founder's profile
export const getFounderProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assume req.user is set by auth middleware
    const user = await User.findById(userId);
    if (!user || user.role !== "founder") {
      return res.status(404).json({ message: "Founder not found" });
    }
    // Dynamic counts
    const ideasCount = await Idea.countDocuments({ author: userId });
    // No Team or Startup model yet, so return 0
    const teamsCount = 0;
    const startupsCount = 0;
    res.json({
      ...user.toObject(),
      ideasCount,
      teamsCount,
      startupsCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// PUT /api/founder/profile - Update current founder's profile
export const updateFounderProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const user = await User.findById(userId);
    if (!user || user.role !== "founder") {
      return res.status(404).json({ message: "Founder not found" });
    }
    Object.assign(user, updates);
    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// POST /api/founder/profile/picture - Upload/update founder's profile picture
export const uploadFounderProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findById(userId);
    if (!user || user.role !== "founder") {
      return res.status(404).json({ message: "Founder not found" });
    }
    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({
      message: "Profile picture updated",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload profile picture" });
  }
};

// POST /api/founder/profile/background - Upload/update founder's profile background
export const uploadFounderProfileBackground = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const user = await User.findById(userId);
    if (!user || user.role !== "founder") {
      return res.status(404).json({ message: "Founder not found" });
    }
    user.profileBg = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({
      message: "Profile background updated",
      profileBg: user.profileBg,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to upload profile background" });
  }
};

// GET /api/founder/profile/:id - Get another founder's public profile
export const getFounderProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "founder") {
      return res.status(404).json({ message: "Founder not found" });
    }
    // Optionally, select only public fields
    res.json({
      id: user._id,
      name: user.name,
      headline: user.headline,
      bio: user.bio,
      profilePicture: user.profilePicture,
      interests: user.interests,
      skills: user.skills,
      linkedin: user.linkedin,
      github: user.github,
      website: user.website,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get founder profile" });
  }
};
