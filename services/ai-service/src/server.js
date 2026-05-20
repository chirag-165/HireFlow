import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/ai',aiRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`🔐 AI Service is running on http://127.0.0.1:${PORT}`);
});