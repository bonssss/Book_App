import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminCategoryPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Book Categories',
      data: [],
      backgroundColor: [],
    }],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admincategories');
        const categories = response.data;

        const labels = categories.map(category => category.category);
        const data = categories.map(category => category.count);
        const backgroundColor = categories.map(
          (_, index) => `hsl(${index * 360 / categories.length}, 70%, 70%)`
        );

        setChartData({
          labels,
          datasets: [{
            label: 'Categories',
            data,
            backgroundColor,
          }],
        });
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Book Categories Distribution</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default AdminCategoryPieChart;
