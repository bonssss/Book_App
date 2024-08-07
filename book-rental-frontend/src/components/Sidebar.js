import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useAuth } from '../services/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    // Clear token and user data, then navigate to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#1e1e1e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ padding: 2 }}>Book Rent</Typography>
        <List>
          <ListItem button component={Link} to="/owner-dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/owner-dashboard/manage-books">
            <ListItemText primary="Upload Book" />
          </ListItem>
          <ListItem button component={Link} to="/owner-dashboard/settings">
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
