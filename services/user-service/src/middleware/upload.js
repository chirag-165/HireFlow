// src/middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // temp memory

export const upload = multer({ storage });