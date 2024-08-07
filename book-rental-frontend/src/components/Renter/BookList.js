import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Collapse, IconButton, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books?status=available'); // Adjust URL and query parameters as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedBookId(expandedBookId === id ? null : id);
  };

  if (loading) return <Typography variant="h6" textAlign="center" sx={{ padding: 2 }}>Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center" sx={{ padding: 2 }}>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
        Available Books
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
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
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={book.imageUrl || '/default-book-image.png'}
                alt={book.title}
                sx={{ objectFit: 'cover', borderTopLeftRadius: 2, borderTopRightRadius: 2, cursor: 'pointer' }}
                onClick={() => handleExpandClick(book.id)}
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
              <Box sx={{ textAlign: 'center', padding: 1 }}>
                <IconButton
                  onClick={() => handleExpandClick(book.id)}
                  aria-expanded={expandedBookId === book.id}
                  sx={{ color: 'primary.main' }}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
