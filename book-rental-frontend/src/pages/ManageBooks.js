import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, TextField, IconButton, Snackbar, Paper, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { MaterialReactTable } from 'material-react-table';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, addBook, updateBook, deleteBook } from '../services/bookService';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ title: '', author: '', category: '', price: '', quantity: '', status: '' });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingBookId, setEditingBookId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks()
      .then(setBooks)
      .catch(err => setError(err.message));
  }, []);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddOrUpdateBook = () => {
    const { title, author, category, price, quantity, status } = bookData;

    if (!title || !author || !category || !price || !quantity) {
      setError('Please fill in all the required fields.');
      return;
    }

    if (editingBookId) {
      updateBook(editingBookId, bookData, file)
        .then(updatedBook => {
          setBooks(books.map(book => (book.id === editingBookId ? updatedBook : book)));
          setBookData({ title: '', author: '', category: '', price: '', quantity: '', status: '' });
          setFile(null);
          setSuccess('Book updated successfully');
          setDialogMessage('Book updated successfully!');
          setDialogOpen(true);
          setEditingBookId(null);
        })
        .catch(err => setError(err.message));
    } else {
      addBook(bookData, file)
        .then(newBook => {
          setBooks([...books, newBook]);
          setBookData({ title: '', author: '', category: '', price: '', quantity: '', status: '' });
          setFile(null);
          setSuccess('Book added successfully');
          setDialogMessage('Book added successfully!');
          setDialogOpen(true);
        })
        .catch(err => setError(err.message));
    }
  };

  const handleEditBook = (book) => {
    setBookData(book);
    setEditingBookId(book.id);
  };

  const handleDeleteBook = (id) => {
    deleteBook(id)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
        setSuccess('Book deleted successfully');
      })
      .catch(err => setError(err.message));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate(-1); // Navigate back
  };

  const columns = [
    { header: 'Title', accessorKey: 'title' },
    { header: 'Author', accessorKey: 'author' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Quantity', accessorKey: 'quantity' },
    { header: 'Status', accessorKey: 'status' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      Cell: ({ row }) => (
        <>
          <IconButton onClick={() => handleEditBook(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteBook(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Manage Books
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4, backgroundColor: '#fff', borderRadius: '8px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Category"
              name="category"
              value={bookData.category}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Price"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={bookData.quantity}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <input type="file" onChange={handleFileChange} style={{ marginTop: '16px' }} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddOrUpdateBook}
              fullWidth
              sx={{ mt: 2, backgroundColor: '#1976d2', color: '#fff' }}
            >
              {editingBookId ? 'Update Book' : 'Add Book'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <MaterialReactTable
        columns={columns}
        data={books}
        muiTableProps={{
          sx: {
            '& .MuiTableCell-root': {
              textAlign: 'center',
            },
            '& .MuiTableCell-head': {
              backgroundColor: '#1976d2',
              color: '#fff',
              fontWeight: 'bold',
            },
            '& .MuiTableBody-root': {
              '& .MuiTableRow-root:nth-of-type(odd)': {
                backgroundColor: '#f5f5f5',
              },
            },
          },
        }}
      />
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
          action={
            <IconButton size="small" color="inherit" onClick={() => setError(null)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
      {success && (
        <Snackbar
          open={Boolean(success)}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
          message={success}
          action={
            <IconButton size="small" color="inherit" onClick={() => setSuccess(null)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>
            Success
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <img
              src="path/to/success-image.png" // Replace with the path to your success image
              alt="Success"
              style={{ width: '100px', height: '100px', marginBottom: '16px' }}
            />
            <Typography variant="h6">{dialogMessage}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageBooks;
