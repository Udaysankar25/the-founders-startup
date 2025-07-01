import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    isVerified: { type: Boolean, default: false },
    authMethod: { type: String, enum: ['manual', 'google'], default: 'manual' },

    otp: { type: String },
    otpExpires: { type: Date },

    resetPasswordOtp: { type: String, default: null },
    resetPasswordOtpExpires: { type: Date, default: null },
    resetPasswordVerified: { type: Boolean, default: false },

    // ✅ Profile fields (optional, user adds them in steps)
    profilePicture: { type: String, default: null },
    headline: { type: String, default: null },
    bio: { type: String, default: null },
    interests: { type: [String], default: [] },
    skills: { type: [String], default: [] }, // ✅ fixed
    lookingFor: { type: [String], default: [] },
    linkedin: { type: String, default: null },
    github: { type: String, default: null },
    website: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);

