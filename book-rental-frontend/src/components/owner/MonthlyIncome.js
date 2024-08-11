import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

const API_URL = 'http://localhost:5000'; // Adjust if necessary

const MonthlyIncome = () => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAuthHeaders } = useAuth(); // Get headers function from AuthContext

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/owner-income`, {
        headers: getAuthHeaders(), // Use the authentication headers
      });
      if (response.data) {
        const { currentMonthIncome = 0, lastMonthIncome = 0 } = response.data;
        setCurrentMonthIncome(currentMonthIncome);
        setLastMonthIncome(lastMonthIncome);
      } else {
        setError('Invalid income data received.');
      }
    } catch (error) {
      console.error('Error fetching monthly income:', error);
      setError('Failed to fetch monthly income.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false in finally block
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  return (
    <Box sx={{
      width: '100%',
      maxWidth: 400,
      margin: 'auto',
      textAlign: 'center',
      padding: 3,
      borderRadius: 2,
      boxShadow: 3,
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      background: 'linear-gradient(145deg, #6e8efb, #a777e3)', // Gradient background
      overflow: 'hidden',
    }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}>
        Monthly Income
      </Typography>
      {loading ? (
        <CircularProgress sx={{ color: 'white' }} />
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <>
          <Typography variant="body1" sx={{ color: 'white' }}>
            Current Month:
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
            ${Number(currentMonthIncome).toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'white' }}>
            Last Month:
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
            ${Number(lastMonthIncome).toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default MonthlyIncome;
