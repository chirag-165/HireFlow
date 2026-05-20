import express from 'express';
import { getUser, selectPlan, updateUser } from '../controllers/authController.js';
import {verifyToken} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getUser',verifyToken, getUser);
router.put('/update',verifyToken, updateUser);
router.post('/plan',verifyToken, selectPlan);

export default router;