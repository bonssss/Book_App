import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      <TextField label="Username" fullWidth margin="normal" />
      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained">Save Changes</Button>
    </Box>
  );
};

export default Settings;
