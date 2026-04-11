import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import {connectDB} from "./config/db.js"; 
import cors from 'cors'
dotenv.config();

const app = express();

// User service CAN parse JSON because it's the final destination
app.use(express.json());
const allowedOrigins = [
  'http://localhost:5173', 
  'https://hire-flow-gules.vercel.app' // Add your production frontend here
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
connectDB();
// Mount the routes so they match the Gateway's incoming request exactly
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 User Service is running on http://127.0.0.1:${PORT}`);
});