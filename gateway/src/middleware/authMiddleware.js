import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "No token Provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 🔥 BULLETPROOF: Check every common way an ID is stored in a JWT
    req.userId = decoded.userId || decoded.id || decoded._id;

    if (!req.userId) {
      return res.status(401).json({ msg: "Token valid, but no ID found inside it." });
    }

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
  }
};