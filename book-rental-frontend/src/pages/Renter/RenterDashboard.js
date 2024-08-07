import React from 'react';
import { Container, Typography, Button, Card, CardContent, CardActions, Paper, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Sample data for pie chart (Replace with real data)
const data = [
  { name: 'Rented Books', value: 400 },
  { name: 'Available Books', value: 300 },
  { name: 'Returned Books', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RenterDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Welcome to Your Dashboard
      </Typography>
      
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom align="center">
          Rental Overview
        </Typography>
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <Card sx={{ width: '250px', mb: 4 }}>
          <CardContent>
            <Typography variant="h6">My Rentals</Typography>
            <Typography variant="body2">View the list of books you currently have rented.</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate('/rentals')}>
              View Rentals
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: '250px', mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Available Books</Typography>
            <Typography variant="body2">Browse and search for available books to rent.</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate('/books')}>
              Browse Books
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: '250px', mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Rental History</Typography>
            <Typography variant="body2">Check your past rental history.</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate('/history')}>
              View History
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: '250px', mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Profile Settings</Typography>
            <Typography variant="body2">Manage your account settings and personal information.</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={() => navigate('/profile')}>
              Settings
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Container>
  );
};

export default RenterDashboard;
