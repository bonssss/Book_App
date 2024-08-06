import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '20px 0',
        marginTop: 'auto',
      }}
    >
      <Grid container justifyContent="center" sx={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Book Rental
          </Typography>
          <Typography variant="body2">
            Rent and lend books with ease.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Quick Links
          </Typography>
          <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            Home
          </Link>
          <Link href="/about" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            About
          </Link>
          <Link href="/contact" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            Contact
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>
            Follow Us
          </Typography>
          <Link href="https://www.facebook.com" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            Facebook
          </Link>
          <Link href="https://www.twitter.com" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            Twitter
          </Link>
          <Link href="https://www.instagram.com" color="inherit" underline="hover" sx={{ display: 'block', marginBottom: '5px' }}>
            Instagram
          </Link>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '20px' }}>
        &copy; {new Date().getFullYear()} Book Rental. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
