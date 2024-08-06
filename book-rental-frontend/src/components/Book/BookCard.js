import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <AppBar
      position="static"
      sx={{
        marginBottom: 2,
        backgroundColor: '#3f51b5',
        boxShadow: 'none',
        padding: '10px 20px',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}
        >
          Book Rental
        </Typography>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}
        >
          <TextField
          backgroundColor="white"
            variant="outlined"
            size="small"
            placeholder="Search books"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              marginRight: 2,
              backgroundColor: 'white',
              borderRadius: '4px',
              width: '250px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ced4da',
                },
                '&:hover fieldset': {
                  borderColor: '#80bdff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#80bdff',
                },
              },
            }}
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
