import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import SystemDashboard from './pages/SystemDashboard';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationForm from './pages/RegistrationForm';
import RenterPage from './pages/Renter/RenterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/" element={<Login />} />
          <Route path="/owner-dashboard/*" element={<ProtectedRoute element={OwnerDashboard} />} />
          <Route path="/system-dashboard" element={<ProtectedRoute element={SystemDashboard} />} />
          <Route path="/renter" element={<ProtectedRoute element={RenterPage} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
