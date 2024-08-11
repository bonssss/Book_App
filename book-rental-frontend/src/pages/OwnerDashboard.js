import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Drawer, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route, Navigate } from 'react-router-dom';
import CategoryPieChart from '../components/owner/CategoryPieChart';
import LiveBookStatus from '../components/owner/LiveBookStatus';
import EarningsSummary from '../components/owner/EarningsSummary';
import Settings from '../pages/Settings';
import ManageBooks from '../pages/ManageBooks';
import { useAuth } from '../services/AuthContext'; // Import useAuth hook
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5000';

const OwnerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getAuthHeaders } = useAuth();
  const sidebarRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
      setSidebarOpen(false);
    }
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
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

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
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? sidebarOpen : true} // Always open on large screens
        onClose={() => setSidebarOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: '#1e1e1e',
            color: 'white',
            top: 0,
            bottom: 0,
            position: 'fixed', // Fixed position
            overflow: 'hidden', // Hide scrollbar
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box ref={sidebarRef} sx={{ height: '100%' }}>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { xs: 0, md: '250px' }, // Adjust margin for sidebar
          transition: 'margin-left 0.3s',
          overflowY: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* Hamburger icon is only visible on mobile screens */}
          {isMobile && (
            <IconButton onClick={handleToggleSidebar} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h4">Owner Dashboard</Typography>
        </Box>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 3 }}>
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
