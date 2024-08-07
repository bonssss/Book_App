import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import SystemDashboard from './pages/SystemDashboard';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationForm from './pages/RegistrationForm';
import RenterPage from './pages/Renter/RenterPage';
import RentalForm from './components/Renter/RentalForm';
import Cart from './components/Renter/Cart';
import PaymentForm from './components/PaymentForm';
import RenterDashboard from './pages/Renter/RenterDashboard';


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
          <Route path="/rental-form" element={<RentalForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/renter-dashboard" element={<RenterDashboard />} />
        

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
