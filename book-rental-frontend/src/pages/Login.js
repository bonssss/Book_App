import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { TextField, Button, Box, Typography, Link, Grid } from '@mui/material';
import logo from '../assets/logo.png'; // Import the logo image

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Ensure login function is correctly defined in AuthContext
      await login({ email, password });
    } catch (err) {
      setError('Failed to log in');
      console.error('Login error:', err); // Log error details for debugging
    }
  };

  return (
    <Grid container height="100vh">
      {/* Left Side with Logo */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1e1e1e', // Blue-black color
          flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens
          textAlign: 'center',
        }}
      >
        {/* Logo Display */}
        <Box sx={{ width: { xs: '100px', md: 'auto' }, mb: { xs: 2, md: 0 } }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '100%', maxWidth: '100px', height: 'auto' }}
          />
        </Box>
      </Grid>
      {/* Right Side with Registration Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          backgroundColor: '#ffffff',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: '100%', maxWidth: '400px' }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              <Link href="/forgot-password" variant="body2">Forgot Password?</Link>
            </Typography>
            <Typography variant="body2" mt={1}>
              Don't have an account? <Link href="/register" variant="body2">Create Account</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
