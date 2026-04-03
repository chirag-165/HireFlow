import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  education: String,
  experience: Number,
  currentRole: String,
  targetRole: String,
  domain: String,

  resumeUrl: String,
}, { timestamps: true });

const User= mongoose.model("User",userSchema);
export default User;