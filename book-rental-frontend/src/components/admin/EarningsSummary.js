import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const API_URL = 'http://localhost:5000'; // Update if necessary

const EarningsSummary = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/earnings`);
        const earnings = response.data;

        setData({
          labels: earnings.map(e => e.date),
          datasets: [{
            label: 'Earnings',
            data: earnings.map(e => e.amount),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }],
        });
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div>
      <h2>Earnings Summary</h2>
      <Line data={data} />
    </div>
  );
};

export default EarningsSummary;
