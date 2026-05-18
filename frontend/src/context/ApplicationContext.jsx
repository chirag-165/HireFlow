import { createContext, useContext, useState, useEffect } from 'react';
import { updateApplication, getApplications } from '../services/api';
import { useAuth } from './AuthContext';

const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

    const loadData = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (err) {
        console.error("Failed to load applications:", err);
      } finally {
        setLoading(false);
      }
    };

  // 1. Initial Fetch on Load
  useEffect(() => {
    loadData();
  }, [token]);

  // 2. The Master Update Function
  // ApplicationContext.jsx

const updateApplicationStatus = async (id, newStatus,) => {
  const targetApp = applications.find(a => a._id === id);
  // console.log("Context:",targetApp)
  if (!targetApp) {
    console.warn("Application not found in state. If this is a new app, ensure it was saved with an _id.");
    return;
  }

  const previousApps = [...applications];

  // 3. OPTIMISTIC UPDATE: Use functional update (prev) to avoid stale state
  setApplications(prev => prev.map(app => 
    app._id === id ? { ...app, status: newStatus } : app
  ));

  // 4. LOG ACTIVITY
  const newActivity = {
    id: Date.now(),
    text: `Moved to ${newStatus}`,
    company: targetApp.company,
    role: targetApp.role,
    time: 'Just now'
  };
  setActivities(prev => [newActivity, ...prev].slice(0, 5));

  // 5. BACKEND SYNC
  try {
    await updateApplication(id, { status: newStatus });
  } catch (error) {
    console.error("Server sync failed. Rolling back UI.", error);
    setApplications(previousApps);
  }
};

  return (
    <ApplicationContext.Provider value={{ 
      applications, 
      activities, 
      loading, 
      updateApplicationStatus,
      setApplications 
    }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApps = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error("useApps must be used within ApplicationProvider");
  return context;
};