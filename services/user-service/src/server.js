import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./config/db.js"; 
import cors from 'cors'
dotenv.config();

const app = express();

// User service CAN parse JSON because it's the final destination
app.use(express.json());
app.use(cors());
connectDB();
// Mount the routes so they match the Gateway's incoming request exactly
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 User Service is running on http://127.0.0.1:${PORT}`);
});