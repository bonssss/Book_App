import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useAuth } from '../services/AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} bgcolor="#f5f5f5">
      <Typography variant="h4" gutterBottom>Owner Dashboard</Typography>
      <Typography variant="h6" gutterBottom>Welcome, {user?.email}</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Upload New Book</Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Upload Book
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">View My Books</Typography>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                View Books
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">View Revenue</Typography>
              <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                View Revenue
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OwnerDashboard;
