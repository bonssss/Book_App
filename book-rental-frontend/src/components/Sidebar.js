import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const Sidebar = () => {
  const navigate = useNavigate();

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
        backgroundColor: '#1e1e1e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ padding: 2 }}>Dashboard</Typography>
        <List>
          <ListItem button component={Link} to="/owner-dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/manage-books">
            <ListItemText primary="Manage Books" />
          </ListItem>
          <ListItem button component={Link} to="/settings">
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
