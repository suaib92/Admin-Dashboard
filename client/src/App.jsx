import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './pages/Dashboard'; // Import Dashboard component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route: Redirect to Login */}
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
