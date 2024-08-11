import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { useAuth } from '../../services/AuthContext';

const AdminSidebar = ({ open, onClose }) => {
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
        position: 'relative',
        backgroundColor: '#1e1e1e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 2,
        overflowX: 'hidden', // Hide horizontal scroll bar
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ paddingBottom: 2 }}>Book Rent</Typography>
        <List>
          <ListItem button component={Link} to="/system-dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/system-dashboard/ownerstatus">
            <ListItemText primary="Owners" />
          </ListItem>
          <ListItem button component={Link} to="/system-dashboard/all-books">
            <ListItemText primary="All Books" />
          </ListItem>
          <ListItem button component={Link} to="/system-dashboard/settings">
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

export default AdminSidebar;
