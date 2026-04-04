// src/controllers/applicationController.js
import Application from "../models/Application.js";

// 🔹 CREATE APPLICATION
export const createApplication = async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;
    
    // Read the lowercase header
    const userId = req.headers['x-user-id']; 
    
    // 🚨 THIRD TRUTH LOG
    console.log("3️⃣ [APP SERVICE] Received userId:", userId);
    console.log("3️⃣ [APP SERVICE] Received company:", company);

    // Prevent saving if the header is literally the string "undefined"
    if (!userId || userId === "undefined") {
      return res.status(400).json({ msg: "Missing valid User ID" });
    }

    const application = await Application.create({
      userId,
      company,
      role,
      status,
      notes,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 GET ALL APPLICATIONS
export const getApplications = async (req, res) => {
  try {
    const userId = req.headers['x-user-id']
    const apps = await Application.find({ userId });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔹 UPDATE STATUS
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id'];

    // ✅ Use findOneAndUpdate to ensure the user owns this record
    const updated = await Application.findOneAndUpdate(
      { _id: id, userId: userId }, 
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Application not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔹 DELETE
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers['x-user-id']
    
    if (!userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    await Application.findByIdAndDelete({_id:id , userId:userId});

    res.json({ msg: "Deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};