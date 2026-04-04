import express from 'express';
import { login, register, getUser } from '../controllers/authController.js';
import { upload } from '../middleware/upload.js'; // Ensure your multer config is here
import {verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();

// These resolve to /api/auth/login and /api/auth/register
router.post('/login', login);
router.post('/register', upload.single("resume"), register);
router.get('/getUser',verifyToken, getUser)

export default router;