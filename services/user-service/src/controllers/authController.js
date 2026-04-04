import User from '../models/User.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const user = await User.find({ _id : userId });

     if (!user) return res.status(404).json({ msg: "User not found or unauthorized" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}