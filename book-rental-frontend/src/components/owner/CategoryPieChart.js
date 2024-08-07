import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const API_URL = 'http://localhost:5000'; // Update if necessary

const CategoryPieChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/books/categories`);
        const categories = response.data;

        setData({
          labels: categories.map(cat => cat.name),
          datasets: [{
            label: 'Book Categories',
            data: categories.map(cat => cat.count),
            backgroundColor: categories.map((_, index) => `hsl(${index * 360 / categories.length}, 70%, 70%)`),
          }],
        });
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Book Categories</h2>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
