const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ Gateway

// 🔹 AUTH FETCH (WITH TOKEN)
const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}), // ✅ correct merge
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Request failed");
  }

  return data;
};



// 🔹 LOGIN
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Login failed");
  }

  return data;
};


// 🔹 REGISTER
export const register = async (formData) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || "Registration Failed");
  }

  return data;
};


// 🔹 GET APPLICATIONS
export const getApplications = async () => {
  return await authFetch("/api/applications");
};


// 🔹 CREATE APPLICATION
export const createApplication = async (form) => {
  return await authFetch("/api/applications", {
    method: "POST",
    body: JSON.stringify(form), // ✅ fixed
  });
};


// 🔹 DELETE
export const deleteApplication = async (id) => {
  return await authFetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
};


// 🔹 UPDATE
export const updateApplication = async (id, updateData) => {
  return await authFetch(`/api/applications/${id}`, {
    method: "PUT",
    body: JSON.stringify(updateData),
  });
};

// 🔹 GETSTATS
export const getAnalytics = async () => {
  return await authFetch("/api/analytics/stats");
};
