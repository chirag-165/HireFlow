import User from '../models/User.js'
import bcrypt, { compare } from "bcryptjs";
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

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // resume (for now just filename)
    const resumeUrl = req.file?.originalname || "";

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

    // JWT
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