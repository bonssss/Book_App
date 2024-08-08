import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext';

ChartJS.register(Tooltip, Legend, ArcElement);

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
    <div sx={{ width: '250px', height: '2050px', margin: 'auto' }}>
      <h2 sx={{ textAlign: 'center', mb: 2 }}>
        Available Books <span sx={{ color: 'gray', fontWeight: 'normal' }}>Today</span>
      </h2>
      <Doughnut 
        data={data}
        options={{
          cutout: '80%', // Increase this value to make the center cut-out larger
          responsive: true,
          plugins: {
            legend: {
              display: true, // Display the legend
              position: 'bottom', // Align the legend at the bottom
              labels: {
                boxWidth: 15,
                padding: 8,
                font: {
                  size: 12
                }
              }
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
      <div sx={{ mt: 2, textAlign: 'center' }}>
        {data.labels.map((label, index) => (
          <div key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <div sx={{
              width: '15px',
              height: '15px',
              backgroundColor: data.datasets[0].backgroundColor[index],
              mr: 1
            }}></div>
            <span sx={{ fontSize: '12px' }}>{label}: {data.datasets[0].data[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPieChart;
