import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Modal, Fade, Backdrop, Paper, Divider, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../../components/PaymentForm';
import { rentBooks } from '../../services/rentalService'; // Import your API service

const RentalForm = () => {
  const { state } = useLocation();
  const [rentalDuration, setRentalDuration] = useState('');
  const [error, setError] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [rentalResponse, setRentalResponse] = useState(null);
  const navigate = useNavigate();

  if (!state || !state.books || state.books.length === 0) {
    return <Typography variant="h6" textAlign="center">No books selected for rental.</Typography>;
  }

  const isSingle = state.single;
  const totalPrice = state.books.reduce((sum, book) => sum + book.price, 0);
  const totalAmount = isSingle ? state.books[0].price * rentalDuration : totalPrice * rentalDuration;

  const handleRentSubmit = async () => {
    const duration = parseInt(rentalDuration, 10);
    if (isNaN(duration) || duration <= 0) {
      setError('Please enter a valid duration.');
      return;
    }

    setError(null);
    setLoading(true); // Set loading to true while making the API call

    try {
      // Prepare the data to be sent to the API
      const books = state.books.map(book => ({
        bookId: book.id,
        quantity: 1, // Assuming quantity is 1 for each book, adjust if needed
        days: duration
      }));
      const response = await rentBooks({ userId: 'defaultUserId', books }); // Replace 'defaultUserId' with actual user ID
      setRentalResponse(response);
      setIsPaymentOpen(true);
    } catch (error) {
      setError(`Error: ${error}`);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
    navigate('/renter');
  };

  return (
    <Box sx={{ padding: 4, minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ width: '100%', maxWidth: 600, p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          {isSingle ? 'Rent Book' : 'Rent Books'}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" gutterBottom>
          {isSingle ? 'Selected Book:' : 'Selected Books:'}
        </Typography>
        {state.books.map(book => (
          <Box key={book.id} sx={{ mb: 2 }}>
            <Typography variant="body1">{book.title} - ${book.price}</Typography>
          </Box>
        ))}
        {!isSingle && (
          <Typography variant="h6" gutterBottom>
            Total Price: ${totalPrice}
          </Typography>
        )}
        <TextField
          label="Number of days"
          type="number"
          variant="outlined"
          fullWidth
          value={rentalDuration}
          onChange={(e) => setRentalDuration(e.target.value)}
          sx={{ mt: 2 }}
          inputProps={{ min: 1 }} // Ensure the input only allows positive integers
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        {loading ? (
          <Typography variant="body1" textAlign="center">Processing...</Typography>
        ) : (
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRentSubmit}
              fullWidth
              sx={{ py: 1.5, fontSize: '1rem', fontWeight: 'bold' }}
            >
              {isSingle ? 'Submit Rental' : 'Submit Cart'}
            </Button>
          </Stack>
        )}
      </Paper>
      <Modal
        open={isPaymentOpen}
        onClose={handlePaymentClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isPaymentOpen}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            p: { xs: 2, sm: 4 }, 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
          }}>
            <PaymentForm totalAmount={totalAmount} onClose={handlePaymentClose} />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default RentalForm;
