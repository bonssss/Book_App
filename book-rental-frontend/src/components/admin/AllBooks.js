import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';

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

  const columns = [
    { accessorKey: 'id', header: 'Roll No' },
    { accessorKey: 'author', header: 'Author' },
    { accessorKey: 'owner.username', header: 'Owner' }, // Ensure this is correct

    { accessorKey: 'category', header: 'Category' },

    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'status', header: 'Status' },
  ];

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        All Books
      </Typography>
      <MaterialReactTable columns={columns} data={books} />
    </Box>
  );
};

export default AllBooks;
