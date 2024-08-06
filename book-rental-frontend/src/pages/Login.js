import React, { useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

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
    <Box
      display="flex"
      height="100vh"
      overflow="hidden"
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#1e1e1e', // Blue-black color
        }}
      />
      <Box
        sx={{
          flex: 1,
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
      </Box>
    </Box>
  );
};

export default Login;
