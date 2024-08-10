import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryPieChart from '../components/owner/CategoryPieChart';
import LiveBookStatus from '../components/owner/LiveBookStatus';
import EarningsSummary from '../components/owner/EarningsSummary';
import Settings from '../pages/Settings';
import ManageBooks from '../pages/ManageBooks';
import { useAuth } from '../services/AuthContext'; // Import useAuth hook
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const OwnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchMonthlyIncome = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/owner-income`, {
        headers: getAuthHeaders(),
      });
      
      const { currentMonthIncome, lastMonthIncome } = response.data;
      setCurrentMonthIncome(currentMonthIncome || 0);
      setLastMonthIncome(lastMonthIncome || 0);

    } catch (error) {
      setError('Failed to fetch monthly income');
      console.error('Error fetching monthly income:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {sidebarOpen && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: sidebarOpen ? '250px' : '0',
          transition: 'margin-left 0.3s',
          overflowY: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleToggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Owner Dashboard</Typography>
        </Box>

        <Routes>
          <Route path="/" element={
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Current Month Income: ${currentMonthIncome.toFixed(2)}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Last Month Income: ${lastMonthIncome.toFixed(2)}
                  </Typography>
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <CategoryPieChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <LiveBookStatus />
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <EarningsSummary
                    currentMonthIncome={currentMonthIncome}
                    lastMonthIncome={lastMonthIncome}
                  />
                </Paper>
              </Grid>
            </Grid>
          } />
          <Route path="settings" element={<Settings />} />
          <Route path="manage-books" element={<ManageBooks />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
