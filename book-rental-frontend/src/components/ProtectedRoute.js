// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

const ProtectedRoute = ({ element: Element, role, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
