import express from "express";
import { getApplication ,createApplication ,updateApplication ,deleteApplication } from '../controllers/applicationController.js'

const router = express.Router();

router.post('/',createApplication);
router.get('/',getApplication);
router.update('/:id',deleteApplication);
router.patch('/:id',updateApplication);

export default router;