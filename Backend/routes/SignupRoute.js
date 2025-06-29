import express from 'express';
import { signup, verifyEmail, resendOTP } from '../controllers/SignupController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail  )
router.post('/resend-otp', resendOTP)

export default router;
