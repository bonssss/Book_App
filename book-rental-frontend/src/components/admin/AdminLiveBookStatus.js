import React, { useEffect, useState } from 'react';
import { IconButton, Snackbar, Alert, Box, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';
import { MaterialReactTable } from 'material-react-table';
import { useAuth } from '../../services/AuthContext'; // Adjust this path if needed
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Ensure this is the correct URL

const AdminLiveBookStatus = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`${API_URL}/api/adminbooks`, {
            params: { ownerId: user.id },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Add authorization header
          });
          setBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBooks();
  }, [user]); // Depend on user to refetch when user changes

  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`); // Navigate to edit page
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API_URL}/api/books/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Add authorization header
        });
        setBooks(books.filter(book => book.id !== bookId));
        setSnackbarMessage('Book deleted successfully!');
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error deleting book:', error);
        setSnackbarMessage('Error deleting book.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const columns = [
    {
      header: 'Roll No',
      accessorKey: 'rollNo',
      Cell: ({ row }) => row.index + 1 // Generate roll number starting from 1
    },
    { header: 'Title', accessorKey: 'title' },
    { accessorKey: 'owner.username', header: 'Owner' }, // Ensure this is correct

    { header: 'Status', accessorKey: 'status' },
    {
      header: 'Action',
      accessorKey: 'id',
      Cell: ({ cell }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEdit(cell.getValue())}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => handleDelete(cell.getValue())}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // Add rollNo property to each book object
  const booksWithRollNo = books.map((book, index) => ({
    ...book,
    rollNo: index + 1
  }));

  return (
    <>
      <Box sx={{ p: 2, width: '100%' }}>
        <Box
          sx={{
            maxWidth: '100%',
            overflowX: 'auto', // Allow horizontal scrolling if needed
          }}
        >
          <MaterialReactTable
            columns={columns}
            data={booksWithRollNo} // Use booksWithRollNo to include roll numbers
            enableSorting={false}
            enableFiltering={false}
            sx={{
              '& .MuiTable-root': {
                minWidth: 800, // Adjust minWidth as needed
              },
            }}
          />
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminLiveBookStatus;
