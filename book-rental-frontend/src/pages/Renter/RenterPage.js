import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Renter/Navbar';
import Footer from '../../components/Renter/Footer';
import LandingPage from '../../components/Renter/LandingPage';
import BookList from '../../components/Renter/BookList';
import { useAuth } from '../../services/AuthContext';

const RenterPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (!user || !localStorage.getItem('token')) {
          throw new Error('User not authenticated');
        }

        const response = await axios.get('http://localhost:5000/api/books/available', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setBooks(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  if (loading) return <Typography variant="h6" textAlign="center">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Navbar />
      <LandingPage />
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
          Available Books for Rent
        </Typography>
      <BookList books={books} />
      <Footer />
    </Box>
  );
};

export default RenterPage;
