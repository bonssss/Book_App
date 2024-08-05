import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { fetchBooks, addBook, updateBook, deleteBook } from '../services/bookService';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState({ title: '', author: '', category: '', price: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(setError);
  }, []);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    addBook(bookData)
      .then(newBook => {
        setBooks([...books, newBook]);
        setBookData({ title: '', author: '', category: '', price: '' });
      })
      .catch(setError);
  };

  const handleUpdateBook = (id) => {
    updateBook(id, bookData)
      .then(updatedBook => {
        setBooks(books.map(book => (book.id === id ? updatedBook : book)));
      })
      .catch(setError);
  };

  const handleDeleteBook = (id) => {
    deleteBook(id)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(setError);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Manage Books</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <TextField label="Title" name="title" value={bookData.title} onChange={handleChange} />
        <TextField label="Author" name="author" value={bookData.author} onChange={handleChange} />
        <TextField label="Category" name="category" value={bookData.category} onChange={handleChange} />
        <TextField label="Price" name="price" value={bookData.price} onChange={handleChange} />
        <Button variant="contained" onClick={handleAddBook}>Add Book</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.price}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleUpdateBook(book.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteBook(book.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error.message}
        />
      )}
    </Box>
  );
};

export default ManageBooks;
