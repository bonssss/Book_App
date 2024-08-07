import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = ({ books, onClear }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/rental-form', { state: { books, single: false } });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {books.length === 0 ? (
        <Typography variant="h6" textAlign="center">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map(book => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <Box sx={{ padding: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="body1">{book.title} - ${book.price}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          disabled={books.length === 0}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClear}
          sx={{ ml: 2 }}
        >
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
