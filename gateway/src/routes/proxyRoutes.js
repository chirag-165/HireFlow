import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://127.0.0.1:5001",
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
    target: "http://127.0.0.1:5002",
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
    target: "http://127.0.0.1:5003",
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