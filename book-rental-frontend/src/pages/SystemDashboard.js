import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Routes, Route } from 'react-router-dom';
import AdminCategoryPieChart from '../components/admin/AdminCategoryPieChart';
import AdminLiveBookStatus from '../components/admin/AdminLiveBookStatus';
import Settings from '../pages/Settings';
import AllBooks from '../components/admin/AllBooks';
import AdminSidebar from '../components/admin/AdminSidebar';
import OwnerStats from '../components/admin/OwnerStats';
import MonthlyIncome from '../components/admin/MonthlyIncome';
import EarningsSummary from '../components/admin/EarningsSummary';

const SystemDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
      overflow='hidden'
        variant={isMobile ? 'temporary' : 'permanent'}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          display: { xs: 'block', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
            backgroundColor: '#1e1e1e',
            color: 'white',
            top: 0,
            bottom: 0,
            position: isMobile ? 'fixed' : 'relative',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: sidebarOpen && !isMobile ? '250px' : '0',
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
          <Typography variant="h4">System Dashboard</Typography>
        </Box>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <MonthlyIncome />
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <AdminCategoryPieChart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, mb: 3 }}>
                  <AdminLiveBookStatus />
                </Paper>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>Earnings Summary</Typography>
                  <EarningsSummary />
                </Paper>
              </Grid>
            </Grid>
          } />
          <Route path="settings" element={<Settings />} />
          <Route path="ownerstatus" element={<OwnerStats />} />
          <Route path="all-books" element={<AllBooks />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default SystemDashboard;
