// src/pages/Renter/RenterPage.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import BookCard from '../../components/Book/BookCard';
import axios from 'axios';
import Navbar from '../../components/Renter/Navbar';
import Footer from '../../components/Renter/Footer';
import LandingPage from '../../components/Renter/LandingPage';
import BookList from '../../components/Renter/BookList';

const RenterPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch available books for rent from the backend
    axios.get('/api/books/available')
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
   
    <Box sx={{ p: 3 }}>
       <Navbar/>
       <LandingPage />
      <Typography variant="h4" gutterBottom>
        Available Books for Rent
      </Typography>
      <Grid container spacing={3}>
        {books.map(book => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookList book={book} />
          </Grid>
        ))}
      </Grid>
      <Footer />

    </Box>
  );
};

export default RenterPage;
