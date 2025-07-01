import { OAuth2Client } from 'google-auth-library';
import User from '../models/SignupModel.js';
import generateToken from '../utils/generateToken.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignup = async (req, res) => {
  const {
    token, // Google JWT from frontend
    headline,
    bio,
    interests,
    skills,
    lookingFor,
    linkedin,
    github,
    website,
  } = req.body;

  try {
    // ✅ 1. Verify the token using Google's public keys
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name;

    if (!email || !name) {
      return res.status(400).json({ message: 'Invalid Google token payload' });
    }

    // ✅ 2. Check for existing user
    let user = await User.findOne({ email });

    if (user) {
      if (user.authMethod === 'google') {
        // User already signed up via Google
        return res.status(200).json({
          message: 'User already signed up with Google',
          user,
          token: generateToken(user._id),
        });
      } else {
        // Conflict: signed up via manual method
        return res.status(400).json({
          message: 'Email already registered via manual signup',
        });
      }
    }

    // ✅ 3. Create new Google user
    user = await User.create({
      name,
      email,
      isVerified: true,
      authMethod: 'google',
      headline: headline || '',
      bio: bio || '',
      interests: interests || [],
      skills: skills || [],
      lookingFor: lookingFor || '',
      linkedin: linkedin || '',
      github: github || '',
      website: website || '',
    });

    // ✅ 4. Return user and JWT
    const jwtToken = generateToken(user._id);

    res.status(201).json({
      message: 'Google signup completed successfully',
      user,
      token: jwtToken,
    });
  } catch (err) {
    console.error('❌ Google Signup Error:', err);
    res.status(500).json({ message: 'Failed to verify Google token' });
  }
};
