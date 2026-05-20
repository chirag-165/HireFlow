import express from "express";
import { generateResponse } from "../controllers/aicontroller.js";

const router = express.Router();

router.post('/chat', generateResponse);

export default router;
