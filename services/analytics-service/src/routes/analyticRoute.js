import express from 'express'
import {statController} from '../controllers/statController.js'

const router = express.Router();

router.use('/stats',statController);

export default router;