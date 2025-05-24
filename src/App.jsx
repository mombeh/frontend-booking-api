// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* You can add more routes like dashboard later */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
