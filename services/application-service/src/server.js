import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/applications", applicationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Application Service running on ${process.env.PORT}`);
});