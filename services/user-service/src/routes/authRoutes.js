import express from 'express';
import { login, register } from '../controllers/authController.js';
import { upload } from '../middleware/upload.js'; // Ensure your multer config is here

const router = express.Router();

// These resolve to /api/auth/login and /api/auth/register
router.post('/login', login);
router.post('/register', upload.single("resume"), register);

export default router;