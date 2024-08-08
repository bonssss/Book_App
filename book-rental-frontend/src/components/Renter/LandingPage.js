import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#CADCFC',
        padding: { xs: '20px', sm: '40px' },
        overflow: 'hidden', // Ensures no overflow
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: { xs: 'center', md: 'left' },
          gap: { xs: '20px', md: '40px' },
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' }, // Align text properly on larger screens
            paddingRight: { md: '20px' },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#00246B',
              marginBottom: '20px',
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
            }}
          >
            Welcome to Book Rental
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginBottom: '20px', fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Discover and rent a wide variety of books. Share your collection with the community and earn money!
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{ marginRight: '10px', fontSize: { xs: '0.875rem', sm: '1rem' }, color: '#CADCFC' }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            marginTop: { xs: '20px', md: '0' },
          }}
        >
          <BookIcon
            sx={{
              fontSize: { xs: '80px', sm: '120px' },
              color: '#3f51b5',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '20px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </Box>
      </Container>

      <Grid container spacing={4} sx={{ marginTop: '40px', paddingX: { xs: '20px', md: '0' } }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Browse Books
            </Typography>
            <Typography variant="body1">
              Explore a vast selection of books across various genres and find your next great read.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Rent & Earn
            </Typography>
            <Typography variant="body1">
              Rent out your books to others and earn money. Manage your collection easily from your dashboard.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: '20px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>
              Connect with Readers
            </Typography>
            <Typography variant="body1">
              Join a community of book lovers. Share recommendations and reviews with fellow readers.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
