import express from 'express';
import {
  requestOTP,
  verifyEmail,
  completeSignup,
  resendOTP,
  loginUser,
  forgotPasswordRequest,
  verifyForgotPasswordOtp,
  resetPassword,
} from '../controllers/SignupController.js';
import { googleSignup } from '../controllers/GoogleSignupController.js';

const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-email', verifyEmail);
router.post('/complete-signup', completeSignup);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);

// 🔐 Forgot password flow
router.post('/forgot-password-request', forgotPasswordRequest);
router.post('/forgot-password-verify-otp', verifyForgotPasswordOtp);
router.post('/forgot-password-reset', resetPassword);

//GoogleSignupFlow
router.post('/google-signup', googleSignup)

export default router;
