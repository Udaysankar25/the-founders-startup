import bcrypt from 'bcryptjs';
import User from '../models/SignupModel.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendEmail(email, 'Verify your email', `Your OTP is: ${otp}`);
    return res.status(201).json({ message: 'Signup successful. OTP sent to email.' });
  } catch (err) {
    console.error('Signup Error:', err);
    return res.status(500).json({ message: 'Server error during signup.' });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    return res.status(500).json({ message: 'Server error during verification.' });
  }
};
export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(email, 'Your New OTP Code', `Your new OTP is: ${otp}`);

    return res.status(200).json({ message: 'OTP resent successfully' });
  } catch (err) {
    console.error('Resend OTP Error:', err);
    res.status(500).json({ message: 'Server error while resending OTP' });
  }
};