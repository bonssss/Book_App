import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5000';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, { email, password });
      if (response.status === 200) {
        const { token, user } = response.data; // Ensure role is included in the response
        localStorage.setItem('token', token);
        setUser(user); // Set the user object including role
        // Navigate based on user role
        if (user.role === 'admin') {
          navigate('/system-dashboard');
        } else if (user.role === 'owner') {
          navigate('/owner-dashboard');
        } else if (user.role === 'renter') {
          navigate('/renter-dashboard'); // Add a renter dashboard if needed
        }
      }
    } catch (error) {
      throw new Error('Failed to log in');
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
