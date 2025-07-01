import bcrypt from 'bcryptjs';
import User from '../models/SignupModel.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';

// Temporary session storage (replace with Redis in prod)
const otpSessions = new Map();

export const requestOTP = async (req, res) => {
  const { name, email, password } = req.body;

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    otpSessions.set(email, { name, email, password, otp, otpExpires, verified: false });

    await sendEmail(email, 'Verify Your Email', `Your OTP is: ${otp}`);
    console.log(`[Signup OTP] Sent to ${email} | OTP: ${otp} | Expires: ${new Date(otpExpires)}`);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error('OTP Request Error:', err);
    res.status(500).json({ message: 'Failed to process signup' });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const session = otpSessions.get(email);

  if (!session) return res.status(400).json({ message: 'No OTP request found' });
  if (session.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
  if (Date.now() > session.otpExpires) {
    otpSessions.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }

  session.verified = true;
  otpSessions.set(email, session);
  return res.status(200).json({ message: 'OTP verified successfully' });
};

export const completeSignup = async (req, res) => {
  const {
    email,
    profilePicture,
    headline,
    bio,
    interests,
    skills,
    lookingFor,
    linkedin,
    github,
    website,
  } = req.body;

  const session = otpSessions.get(email);
  if (!session || !session.verified) {
    return res.status(400).json({ message: 'Email not verified or session expired' });
  }

  try {
    const hashedPassword = await bcrypt.hash(session.password, 10);

    const user = await User.create({
      name: session.name,
      email: session.email,
      password: hashedPassword,
      isVerified: true,
      profilePicture,
      headline,
      bio,
      interests,
      skills,
      lookingFor,
      linkedin,
      github,
      website,
    });

    otpSessions.delete(email);
    return res.status(201).json({ message: 'Account created successfully', user });
  } catch (err) {
    console.error('Final Signup Error:', err);
    res.status(500).json({ message: 'Failed to create user' });
  }
};

export const resendOTP = async (req, res) => {
  const { email } = req.body;
  const session = otpSessions.get(email);

  if (!session) return res.status(404).json({ message: 'Session not found. Start signup again.' });

  const otp = generateOTP();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  session.otp = otp;
  session.otpExpires = otpExpires;
  otpSessions.set(email, session);

  try {
    await sendEmail(email, 'Resend OTP', `Your new OTP is: ${otp}`);
    console.log(`[Resend OTP] Sent to ${email} | OTP: ${otp} | Expires: ${new Date(otpExpires)}`);
    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (err) {
    console.error('Resend OTP Error:', err);
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        headline: user.headline,
        github: user.github,
        linkedin: user.linkedin,
      },
      token,
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Failed to login' });
  }
};

// --- 🔐 Forgot Password Controllers ---

// In-memory OTP cooldown tracker
const otpThrottleMap = new Map();

export const forgotPasswordRequest = async (req, res) => {
  const { email } = req.body;

  const lastSent = otpThrottleMap.get(email);
  if (lastSent && Date.now() - lastSent < 30 * 1000) {
    return res.status(429).json({ message: 'Wait 30 seconds before requesting another OTP' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = otpExpires;
    user.resetPasswordVerified = false;

    await user.save();
    await sendEmail(email, 'Reset Your Password', `Your OTP is: ${otp}`);

    otpThrottleMap.set(email, Date.now());

    console.log(`[Forgot OTP] Sent to ${email} | OTP: ${otp} | Expires: ${new Date(otpExpires)}`);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot Password Request Error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resetPasswordOtp || !user.resetPasswordOtpExpires) {
      return res.status(400).json({ message: 'No OTP request found' });
    }

    if (Date.now() > user.resetPasswordOtpExpires) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (user.resetPasswordOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.resetPasswordVerified = true;
    await user.save();

    console.log(`[OTP Verified] For ${email} | OTP: ${otp}`);
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  if (!strongPasswordRegex.test(newPassword)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.',
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !user.resetPasswordVerified) {
      return res.status(400).json({ message: 'OTP not verified or request invalid' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpires = null;
    user.resetPasswordVerified = false;

    await user.save();

    console.log(`[Password Reset] Successful for ${email}`);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password Reset Error:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};
