import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CategoryPieChart from '../components/owner/CategoryPieChart';
import LiveBookStatus from '../components/owner/LiveBookStatus';
import EarningsSummary from '../components/owner/EarningsSummary';
import Settings from '../pages/Settings';
import ManageBooks from '../pages/ManageBooks';

const OwnerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={handleToggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Owner Dashboard</Typography>
        </Box>
        
        <Box mt={3}>
          <TextField
            label="Search Books"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
        </Box>

        <Routes>
          <Route path="/" element={
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2 }}>
                  <CategoryPieChart />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>Live Book Status</Typography>
                  <LiveBookStatus />
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Earnings Summary</Typography>
                  <EarningsSummary />
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
