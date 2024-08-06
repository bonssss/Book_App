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
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => navigate('/register')}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
              <Box sx={{ display: 'none', sm: 'flex', alignItems: 'center' }}>
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
                    sx={{ marginRight: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton type="submit">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                {user ? (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/renter-dashboard')}>
                      Dashboard
                    </Button>
                    <Button color="inherit" onClick={logout}>
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>
                      Register
                    </Button>
                  </Box>
                )}
              </Box>
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
                  sx={{ marginRight: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {user ? (
                  <>
                    <Button color="inherit" onClick={() => navigate('/renter-dashboard')}>
                      Dashboard
                    </Button>
                    <Button color="inherit" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/register')}>
                      Register
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
