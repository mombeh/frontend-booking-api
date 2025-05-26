// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';

const DashboardRedirect = () => {
  const { role } = useContext(AuthContext);

  if (role === 'user') return <Navigate to="/user/dashboard" />;
  if (role === 'provider') return <Navigate to="/provider/dashboard" />;
  return <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Redirect based on role */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Individual dashboards */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
