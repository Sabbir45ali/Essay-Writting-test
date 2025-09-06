import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

import EssayTest from './pages/EssayTest';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// PrivateRoute component to protect private pages
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({}); // You can verify token or load user from backend here
    }
  }, []);

  const handleLoginSuccess = (userData) => setUser(userData);
  const handleSignupSuccess = (navigate) => {
    // After signup success, redirect to login page
    navigate('/login');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div>
        {user && (
          <div className="p-4 text-right">
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute user={user}>
                <EssayTest user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/signup"
            element={<SignupWithNavigation onSignupSuccess={handleSignupSuccess} />}
          />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
};

// Signup component wrapper to access navigation hook
const SignupWithNavigation = ({ onSignupSuccess }) => {
  const navigate = useNavigate();

  const handleSignup = (userData) => {
    onSignupSuccess(navigate);
  };

  return <Signup onSignupSuccess={handleSignup} />;
};

export default App;
