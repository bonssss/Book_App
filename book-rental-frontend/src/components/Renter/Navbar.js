import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        {user ? (
          <>
            <ListItem button onClick={() => navigate('/renter-dashboard')}>
              <ListItemText primary="Dashboard" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Login" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/register')}>
              <ListItemText primary="Register" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', zIndex: theme.zIndex.drawer + 1, backgroundColor: '#00246B' }}>
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#CADCFC', cursor: 'pointer' }} onClick={() => navigate('/')}>
            Book Rental
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {drawerItems}
              </Drawer>
            </>
          ) : (
            <>
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search books"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  sx={{
                    marginRight: 2,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '5px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#CADCFC',
                      },
                      '&:hover fieldset': {
                        borderColor: '#3f51b5',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#00246B',
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon sx={{ color: '#00246B' }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {user ? (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/renter-dashboard')}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': { color: '#3f51b5' },
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      color="inherit"
                      onClick={logout}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': { color: '#3f51b5' },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/login')}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': { color: '#3f51b5' },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => navigate('/register')}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        '&:hover': { color: '#3f51b5' },
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '64px' }}>
        {/* Main content goes here */}
      </Box>
    </>
  );
};

export default Navbar;
