import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';


const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuthContext()
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


const App = () => {
  const { accessToken } = useAuthContext()

  return (
    <Router>
      {accessToken && <Navbar />}
      <div className="pt-16">
        <Routes>
          {/* Redirect if already logged in */}
          <Route path="/login" element={accessToken ? <Navigate to="/dashboard" /> : <Login />} />

          <Route
            path="/signup"
            element={accessToken ? <Navigate to="/dashboard" /> : <Signup />}
          />
          {/* Main dashboard - protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Default route */}
          <Route path="/" element={<Navigate to={accessToken ? "/dashboard" : "/login"} />} />

          {/* Fallback for 404s */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
      <Toaster position="top-center" />
    </Router>
  );
};

export default App;
