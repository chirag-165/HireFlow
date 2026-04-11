import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { verifyToken } from "../middleware/authMiddleware.js";
import dotenv from 'dotenv'
dotenv.config();

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/": "/api/auth/" },
     on: {
      proxyReq: (proxyReq, req, res) => {
        fixRequestBody(proxyReq, req);
      }
    },
  })
);

// 🔒 APPLICATION ROUTES
router.use(
  "/applications",
  verifyToken, 
  createProxyMiddleware({
    target: process.env.APPLICATION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/applications/", 
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        if (req.userId) {
          proxyReq.setHeader("x-user-id", String(req.userId)); 
        }
        fixRequestBody(proxyReq, req);
      }
    }
  })
);

router.use(
  "/analytics",
  verifyToken, 
  createProxyMiddleware({
    target: process.env.Analytic_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/api/analytics/", 
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        if (req.userId) {
          proxyReq.setHeader("x-user-id", String(req.userId)); 
        }
        fixRequestBody(proxyReq, req);
      }
    }
  })
);


export default router;