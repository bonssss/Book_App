import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Divider, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../services/AuthContext';

const Sidebar = ({ open, onToggle }) => {
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
        width: open ? 250 : 0,
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width 0.3s',
        overflow: 'hidden',
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          {open && <Typography variant="h6">Book Rent</Typography>}
          <IconButton
            sx={{ marginLeft: 'auto' }}
            onClick={onToggle}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {open && (
          <>
            <List>
              <ListItem button component={Link} to="/owner-dashboard">
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/upload-book">
                <ListItemText primary="Upload Book" />
              </ListItem>
              <ListItem button component={Link} to="/settings">
                <ListItemText primary="Settings" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
