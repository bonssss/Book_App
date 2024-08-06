import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Collapse, IconButton } from '@mui/material';
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

  if (loading) return <Typography variant="h6" textAlign="center">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error" textAlign="center">Error: {error}</Typography>;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Book List
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} md={4} key={book.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'scale(1.03)',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={book.imageUrl}
                alt={book.title}
                onClick={() => handleExpandClick(book.id)}
                sx={{ cursor: 'pointer' }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
              <Collapse in={expandedBookId === book.id} timeout="auto" unmountOnExit>
                <Box sx={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                  <Typography variant="body1">{book.description}</Typography>
                </Box>
              </Collapse>
              <Box sx={{ textAlign: 'center', padding: '10px' }}>
                <IconButton
                  onClick={() => handleExpandClick(book.id)}
                  aria-expanded={expandedBookId === book.id}
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
