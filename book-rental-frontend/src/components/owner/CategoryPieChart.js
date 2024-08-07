import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const API_URL = 'http://localhost:5000'; // Adjust if necessary

const CategoryPieChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const { user } = useAuth(); // Get user from AuthContext

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id; // Get user ID from context
        if (!userId) {
          console.error('User ID is not available');
          return;
        }

        const response = await axios.get(`${API_URL}/api/categories`, { params: { userId } });
        const categories = response.data;

        // console.log('Fetched categories:', categories); // Log data for debugging

        setData({
          labels: categories.map(cat => cat.name),
          datasets: [{
            label: 'Book Categories',
            data: categories.map(cat => cat.count),
            backgroundColor: categories.map((_, index) => `hsl(${index * 360 / categories.length}, 70%, 70%)`),
            borderWidth: 0, // Remove border to make it a smooth doughnut
          }],
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h2>Book Categories</h2>
      <Doughnut 
        data={data}
        options={{
          cutout: '60%', // Adjust this value to control the size of the center cut-out
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default CategoryPieChart;
