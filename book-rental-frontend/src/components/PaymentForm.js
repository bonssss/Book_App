import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Paper, CircularProgress, Stack } from '@mui/material';
import axios from 'axios';

const PaymentForm = ({ books, totalAmount, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/payments/initialize', {
        first_name: name.split(' ')[0],
        last_name: name.split(' ')[1] || '',
        email,
        amount: totalAmount, // Ensure this is set correctly
        currency: 'ETB',
        callback_url: 'https://example.com/callback',
        return_url: 'https://example.com/return',
      });

      if (response.data.status === 'success') {
        window.location.href = response.data.data.checkout_url;
      } else {
        alert('Payment initialization failed.');
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      alert('An error occurred.');
    }

    setLoading(false);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Payment
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Typography variant="h6" gutterBottom textAlign="center">
          Total Amount: ${totalAmount}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay Now'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default PaymentForm;
