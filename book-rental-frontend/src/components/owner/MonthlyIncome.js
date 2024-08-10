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
    <Box sx={{ width: '300px', margin: 'auto', textAlign: 'center', padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Monthly Income
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Typography variant="h6">
            Current Month: 
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ${Number(currentMonthIncome).toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Last Month: 
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ${Number(lastMonthIncome).toFixed(2)}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default MonthlyIncome;
