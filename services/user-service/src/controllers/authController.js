import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SelectPlan from '../models/selectPlan.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const register = async (req, res) => {
  try {
    console.log("Received registration data:", req.body);
    const {
      name,
      email,
      password,
      education,
      experience,
      currentRole,
      targetRole,
      domain,
    } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get resume filename from Multer
    const resumeUrl = req.file?.originalname || "";

    // Create user in DB
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      education,
      experience,
      currentRole,
      targetRole,
      domain,
      resumeUrl,
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

     if (!user) return res.status(404).json({ msg: "User not found or unauthorized" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

export const selectPlan = async (req,res) => {
  try{ 
    const userId = req.userId;
    const { planName, email } = req.body;
    
    if (!planName || !email) {
      return res.status(400).json({ msg: "Plan name and email are required" });
    }

    const userPlan = await SelectPlan.create({
      userId,
      planName,
      email
    });

    res.json({ msg: "Plan selected successfully", userPlan });

    res.status(201).json({ msg: "Plan selected successfully", userPlan });  
  }catch(err){
    res.status(500).json({ msg: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const allowedFields = ['name', 'education', 'currentRole', 'targetRole', 'experience', 'github', 'linkedin','domain','skills'];
    const updateData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const userId = req.userId;

    const user = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found or unauthorized" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
