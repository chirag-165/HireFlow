import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

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
app.use(express.json());

connectDB();

app.use("/api/applications", applicationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Application Service running on ${process.env.PORT}`);
});