import React, { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Collapse, Divider, Button, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Image from '../../assets/default.jpg';

const BookList = ({ books }) => {
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const navigate = useNavigate();

  const handleExpandClick = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  const handleCheckboxChange = (book) => {
    setSelectedBooks(prevState => {
      if (prevState.some(b => b.id === book.id)) {
        return prevState.filter(b => b.id !== book.id);
      } else {
        return [...prevState, book];
      }
    });
  };

  const handleRentSingleClick = async (book) => {
    try {
        const userId = parseInt(localStorage.getItem('userId'), 10); 
        console.log(localStorage.getItem('userId'));
// Retrieve and parse userId as an integer
        console.log('Retrieved userId:', userId);
        if (isNaN(userId)) {
            alert('Invalid user ID');
            return;
        }

        const requestData = {
            userId: userId, // Ensure userId is an integer
            books: [
                {
                    bookId: book.id,
                    quantity: 1,
                },
            ],
        };

        console.log('Request Data:', requestData);

        const response = await axios.post('http://localhost:5000/api/rent-books', requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure correct token is used
                'Content-Type': 'application/json' // Ensure the content type is set to JSON
            },
        });

        console.log('Response:', response.data); // Log the successful response
        alert(response.data.message); // Show success message

    } catch (error) {
        console.error('Error renting book:', error.response ? error.response.data : error.message);
        alert('Failed to rent book. Please try again.');
    }
};


  const handleRentMultipleClick = async () => {
    if (selectedBooks.length === 0) {
      alert('Please select books to add to cart.');
    } else {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve userId from local storage or other source

        const requestData = {
          userId: parseInt(userId), // Ensure userId is an integer
          books: selectedBooks.map(book => ({
            bookId: book.id,
            quantity: 1,
          })),
        };

        console.log('Request Data:', requestData);

        const response = await axios.post('http://localhost:5000/api/rent-books', requestData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust based on your token storage
          },
        });

        console.log('Response:', response.data); // Log the successful response
        alert(response.data.message); // Show success message

      } catch (error) {
        console.error('Error renting books:', error.response ? error.response.data : error.message);
        alert('Failed to rent books. Please try again.');
      }
    }
  };

  if (!books || books.length === 0) return <Typography variant="h6" textAlign="center">No books are currently available for rent. Please check back later.</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {books.map((book) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  width: '100%',
                  maxWidth: 345,
                  margin: 'auto',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${book.imageUrl}`}
                  alt={book.title}
                  sx={{ 
                    objectFit: 'cover', 
                    borderTopLeftRadius: 2, 
                    borderTopRightRadius: 2, 
                    cursor: 'pointer',
                    width: '100%',
                  }}
                  onClick={() => handleExpandClick(book.id)}
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.src = Image; // Fallback to default image on error
                  }}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                    Price: ${book.price}
                  </Typography>
                </CardContent>
                <Collapse in={expandedBookId === book.id} timeout="auto" unmountOnExit>
                  <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }}>
                    <Typography variant="body1" sx={{ fontSize: '0.875rem' }}>{book.description || 'No description available.'}</Typography>
                  </Box>
                </Collapse>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
                  <Checkbox
                    checked={selectedBooks.some(b => b.id === book.id)}
                    onChange={() => handleCheckboxChange(book)}
                    aria-label={`Select ${book.title}`}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRentSingleClick(book)}
                    sx={{ mr: 1 }}
                  >
                    Rent Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRentMultipleClick}
          disabled={selectedBooks.length === 0}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default BookList;
