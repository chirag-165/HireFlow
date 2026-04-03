import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './router/PrivateRouter';

import Login from './page/Login';
import Register from './page/Register'
import Dashboard from './page/Dashboard';
import Application from './page/Application';
import Setting from './page/Setting';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/application"
          element={
            <PrivateRoute>
              <Application />
             </PrivateRoute>
          }
        />

        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;