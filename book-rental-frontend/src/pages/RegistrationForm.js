import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Link, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png'; // Import the logo image

const API_URL = 'http://localhost:5000'; // Update this if needed

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('renter');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password, confirmPassword, role, location, phoneNumber });
      if (response.status === 201) {
        setSuccessMessage('Registration successful. Please wait for admin approval.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      {/* Left Side with Logo and Title */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#1e1e1e',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 3,
          textAlign: 'center',
        }}
      >
        <img src={logo} alt="Logo" style={{ width: '80px', marginBottom: '24px', maxWidth: '100%' }} /> {/* Ensure logo is visible on all devices */}
        <Typography variant="h4" color="white" sx={{ fontSize: '1.5rem' }}>
          Book Rental App
        </Typography>
      </Grid>

      {/* Right Side with Registration Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '360px' }, // Adjust maxWidth for small devices
            padding: 2,
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontSize: '1.25rem' }}>
            Register
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 1, fontSize: '0.875rem' }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success" sx={{ mb: 1, fontSize: '0.875rem' }}>
              {successMessage}
            </Typography>
          )}
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
            <InputLabel sx={{ fontSize: '0.875rem' }}>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              sx={{ fontSize: '0.875rem' }}
            >
              <MenuItem value="renter">Renter</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="dense"
            InputLabelProps={{ sx: { fontSize: '0.875rem', top: '10px' } }} // Adjust label position
            sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem', height: '30px', padding: '0 16px' } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: '0.875rem' } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                I accept the <Link href="#" variant="body2">Terms and Conditions</Link>
              </Typography>
            }
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!termsAccepted}
            sx={{ mt: 2, fontSize: '0.875rem', height: '40px' }} // Increased button height
          >
            Register
          </Button>
          <Box
            mt={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Link href="/login" variant="body2" sx={{ fontSize: '0.875rem' }}>
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
