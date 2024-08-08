import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, TextField, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryPieChart from '../components/owner/CategoryPieChart';
import LiveBookStatus from '../components/owner/LiveBookStatus';
import EarningsSummary from '../components/owner/EarningsSummary';
import Settings from '../pages/Settings';
import ManageBooks from '../pages/ManageBooks';
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if necessary

const OwnerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/income/monthly`);
      setMonthlyIncome(response.data.income); // Adjust according to your API response
    } catch (error) {
      console.error('Error fetching monthly income:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

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
                    Monthly Income: ${monthlyIncome.toFixed(2)}
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
                  <Typography variant="h6" gutterBottom>Earnings Summary</Typography>
                  {/* <EarningsSummary /> */}
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
