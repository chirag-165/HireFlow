import express from "express";
import { getApplications ,createApplication ,updateApplication ,deleteApplication } from '../controllers/applicationController.js'

const router = express.Router();

router.post('/',createApplication);
router.get('/',getApplications);
router.delete('/:id',deleteApplication);
router.put('/:id',updateApplication);

export default router;