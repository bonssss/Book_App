import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      // Call backend login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      const userData = response.data;
      setUser(userData.user); // Set user data in context
      localStorage.setItem('token', userData.token);

      // Redirect based on user role
      switch (userData.user.role) {
        case 'admin':
          navigate('/system-dashboard');
          break;
        case 'owner':
          navigate('/owner-dashboard');
          break;
        case 'renter':
          navigate('/renter'); // Ensure this route exists
          break;
        default:
          navigate('/login'); // Redirect to login for unknown roles
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
