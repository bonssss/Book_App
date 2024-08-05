import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';

const SystemDashboard = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} bgcolor="#f5f5f5">
      <Typography variant="h4" gutterBottom>System Dashboard</Typography>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Manage Owners</Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Manage Owners
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Approve Books</Typography>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                Approve Books
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Filter Books</Typography>
              <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                Filter Books
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemDashboard;
