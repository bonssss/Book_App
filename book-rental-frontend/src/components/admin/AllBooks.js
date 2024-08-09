import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Box, CircularProgress, Typography, Button } from '@mui/material';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/adminbooks');
        setBooks(response.data);
      } catch (error) {
        setError('Error fetching books.');
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleApprove = async (bookId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/books/${bookId}/approve`);
      const updatedBook = response.data.book;

      // Update the book's status in the table
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );

      alert('Book approved successfully!');
    } catch (error) {
      console.error('Error approving book:', error);
      alert('Failed to approve the book.');
    }
  };

  const columns = [
    { accessorKey: 'id', header: 'Roll No', size: 50 },
    { accessorKey: 'author', header: 'Author', size: 120 },
    { accessorKey: 'owner.username', header: 'Owner', size: 120 },
    { accessorKey: 'category', header: 'Category', size: 100 },
    { accessorKey: 'title', header: 'Title', size: 180 },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      Cell: ({ cell }) => (
        <Typography sx={{ fontWeight: 'bold' }}>
          {cell.getValue() === 'available' ? 'Approved' : 'Pending'}
        </Typography>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {row.original.status === 'pending' ? (
            <Button variant="contained" color="primary" onClick={() => handleApprove(row.original.id)}>
              Approve
            </Button>
          ) : (
            <Typography>Approved</Typography>
          )}
        </Box>
      ),
    },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: '16px', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        All Books
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={books}
        muiTableContainerProps={{
          sx: {
            maxWidth: '100%', // Ensure the table container is responsive
            overflowX: 'auto', // Allow horizontal scrolling if necessary
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: '4px', // Reduce padding
            fontSize: '0.75rem', // Reduce font size
            overflow: 'hidden', // Hide overflow text
            textOverflow: 'ellipsis', // Show ellipsis for overflow text
            whiteSpace: 'nowrap', // Prevent text from wrapping
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: '4px', // Reduce padding
            fontSize: '0.75rem', // Reduce font size
          },
        }}
        muiTablePaginationProps={{
          sx: {
            padding: '4px', // Reduce padding
          },
        }}
      />
    </Box>
  );
};

export default AllBooks;
