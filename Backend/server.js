import express from "express";
import http from "http"; // ✅ Required for socket.io
import { Server as SocketIOServer } from "socket.io"; // ✅ Renamed for clarity
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import signupRoutes from "./routes/SignupRoute.js";
import founderProfileRoutes from "./routes/FounderProfileRoute.js";
import founderIdeaRoutes from "./routes/FounderIdeaRoute.js";
import messageRoutes from "./routes/MessageRoute.js";
import notificationRoutes from "./routes/NotificationRoute.js";
import path from "path";

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Wrap express in HTTP server

// ✅ Initialize Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Socket.IO Events
io.on("connection", (socket) => {
  console.log("📡 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });

  // Example event handler
  socket.on("ping", () => {
    console.log('📍 Received "ping" from client');
    socket.emit("pong"); // Response
  });
});

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// 🔗 Connect to MongoDB
connectDB();

// 📦 API Routes
app.use("/api/auth", signupRoutes);
app.use("/api/founder", founderProfileRoutes);
app.use("/api/ideas", founderIdeaRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 🧪 Temporary root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
