import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post(`${API_URL}/api/register`, { username, email, password, confirmPassword, role, location, phoneNumber });
      if (response.status === 201) {
        setSuccessMessage('Registration successful. Please wait for admin approval.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
    >
      <Box
        sx={{
          flex: 2,
          backgroundColor: '#1e1e1e', // Blue-black color
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}
      >
        <Typography variant="h4" color="white" sx={{ fontSize: '1.25rem' }}>Book Rental App</Typography>
      </Box>
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: 2,
            boxShadow: 1,
            borderRadius: 1,
            backgroundColor: '#f9f9f9',
            height: '100%',
            marginRight: '20px'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ mb: 2, fontSize: '1rem' }}>
            Register
          </Typography>
          {error && <Typography color="error" sx={{ mb: 1, fontSize: '0.75rem' }}>{error}</Typography>}
          {successMessage && <Typography color="success" sx={{ mb: 1, fontSize: '0.75rem' }}>{successMessage}</Typography>}
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 1 }}>
            <InputLabel sx={{ fontSize: '0.75rem' }}>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              sx={{ fontSize: '0.75rem' }}
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
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ mb: 1, fontSize: '0.75rem', '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: '0.75rem' } }}
              />
            }
            label={
              <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                I accept the <Link href="#" variant="body2">Terms and Conditions</Link>
              </Typography>
            }
            sx={{ mb: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!termsAccepted}
            sx={{ mt: 1, fontSize: '0.75rem', height: '36px' }}
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
            <Link href="/login" variant="body2" sx={{ fontSize: '0.75rem' }}>
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
