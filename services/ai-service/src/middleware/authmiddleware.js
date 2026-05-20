export const verifyToken = (req, res, next) => {
  try{
    const userId = req.headers['x-user-id']; 
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = userId; 
    next();
  }catch(err){
    res.status(500).json({ msg: err.message });
  }
};