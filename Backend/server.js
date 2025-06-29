import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import signupRoutes from './routes/SignupRoute.js'; // ✅ Add this

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// 🔗 Connect to MongoDB
connectDB();

// 📦 API Routes
app.use('/api/auth', signupRoutes); // ✅ Add this

// 🧪 Temporary root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
