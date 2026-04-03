// src/controllers/applicationController.js
import Application from "../models/Application.js";

// 🔹 CREATE APPLICATION
export const createApplication = async (req, res) => {
  try {
    const { company, role, status, notes } = req.body;

    const application = await Application.create({
      userId: req.userId, // from JWT (later)
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
    const apps = await Application.find({ userId: req.userId });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔹 UPDATE STATUS
export const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Application.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔹 DELETE
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await Application.findByIdAndDelete(id);

    res.json({ msg: "Deleted" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};