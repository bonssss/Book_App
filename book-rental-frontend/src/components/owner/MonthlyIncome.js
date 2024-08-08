import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';

const API_URL = 'http://localhost:5000'; // Adjust if necessary

const MonthlyIncome = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const { getAuthHeaders } = useAuth(); // Get headers function from AuthContext

  const fetchMonthlyIncome = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/income/monthly`, {
        headers: getAuthHeaders(), // Use the authentication headers
      });
      setMonthlyIncome(response.data.income); // Adjust according to your API response
    } catch (error) {
      console.error('Error fetching monthly income:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyIncome();
  }, []);

  return (
    <div sx={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
      <h2>Monthly Income</h2>
      <p sx={{ fontSize: '24px', fontWeight: 'bold' }}>${monthlyIncome.toFixed(2)}</p>
    </div>
  );
};

export default MonthlyIncome;
