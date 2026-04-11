import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Public pages
import Login    from './pages/Login';
import Register from './pages/Register';

// Protected pages
import Dashboard    from './pages/Dashboard';
import Application from './pages/Application';
import Activity from './pages/Activity';
import Analytics from './pages/Analytics';
import AIChat       from './pages/AIChat';
import Profile      from './pages/Profile';
import Pricing      from './pages/Pricing';
import Setting from './pages/Setting';

const App = () => {
  return (
    <ThemeProvider>
        <Router>
          <Routes>
            {/* Public */}
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected — wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/applications" element={<Application />} />
              <Route path="/activity"     element={<Activity />} />
              <Route path="/analytics"    element={<Analytics />} />
              <Route path="/settings"     element={<Setting />} />
              <Route path="/chat"         element={<AIChat />} />
              <Route path="/profile"      element={<Profile />} />
              <Route path="/pricing"      element={<Pricing />} />
            </Route>

            {/* Fallback */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
    </ThemeProvider>
  );
};

export default App;