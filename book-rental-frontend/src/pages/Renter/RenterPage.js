import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Renter/Navbar';
import Footer from '../../components/Renter/Footer';
import LandingPage from '../../components/Renter/LandingPage';
import BookList from '../../components/Renter/BookList';

const RenterPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available books for rent from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/available'); // Correct endpoint
        setBooks(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <Typography variant="h6" textAlign="center">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Navbar />
      <LandingPage />
      <Typography variant="h4" gutterBottom>
        Available Books for Rent
      </Typography>
      <BookList books={books} /> {/* Pass books data as a prop */}
      <Footer />
    </Box>
  );
};

export default RenterPage;
