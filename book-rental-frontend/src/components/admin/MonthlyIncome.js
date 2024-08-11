import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper } from '@mui/material';
import { useAuth } from '../../services/AuthContext';

const API_URL = 'http://localhost:5000'; // Adjust if necessary

const MonthlyIncome = () => {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const { getAuthHeaders } = useAuth(); // Get headers function from AuthContext

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/income-summary`, {
        headers: getAuthHeaders(), // Use the authentication headers
      });
      setCurrentMonthIncome(response.data.currentMonthIncome || 0);
      setLastMonthIncome(response.data.lastMonthIncome || 0);
    } catch (error) {
      console.error('Error fetching monthly income:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Monthly Income</Typography>
      <Typography variant="body1">
        <strong>Current Month:</strong> ${currentMonthIncome.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        <strong>Last Month:</strong> ${lastMonthIncome.toFixed(2)}
      </Typography>
    </Paper>
  );
};

export default MonthlyIncome;
