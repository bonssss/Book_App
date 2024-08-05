import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const OwnerDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [booksRented, setBooksRented] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch statistics from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/owner/dashboard-stats');
        const { revenue, totalBooks, booksRented } = response.data;
        setTotalRevenue(revenue);
        setTotalBooks(totalBooks);
        setBooksRented(booksRented);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>Owner Dashboard</Typography>
        <Box mt={3}>
          <TextField
            label="Search Books"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary">Search</Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h5">${totalRevenue}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Books</Typography>
              <Typography variant="h5">{totalBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Books Rented</Typography>
              <Typography variant="h5">{booksRented}</Typography>
            </Paper>
          </Grid>
        </Grid>
      
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
