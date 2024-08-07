import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Slider,
  Box
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../services/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000'; // Ensure this is the correct URL

const LiveBookStatus = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth(); // Get user from AuthContext
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Default price range
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(`${API_URL}/api/books`, {
            params: { ownerId: user.id },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Add authorization header
          });
          setBooks(response.data);
          setFilteredBooks(response.data);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBooks();
  }, [user]); // Depend on user to refetch when user changes

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategories.length > 0) {
        result = result.filter(book => selectedCategories.includes(book.category));
      }

      result = result.filter(book => book.price >= priceRange[0] && book.price <= priceRange[1]);

      if (sortOrder === 'asc') {
        result = result.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        result = result.sort((a, b) => b.title.localeCompare(a.title));
      }

      setFilteredBooks(result);
    };

    applyFilters();
  }, [searchTerm, sortOrder, selectedCategories, priceRange, books]);

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ flexGrow: 1, mr: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              ),
              sx: { borderRadius: 1 }
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Sort">
              <IconButton color="primary" onClick={handleSort}>
                <SortIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton color="primary" onClick={handleFilter}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseFilter}
          sx={{ mt: 2 }}
        >
          <MenuItem>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
          <MenuItem>
            <Box sx={{ width: 300, padding: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Slider
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  step={5}
                  marks
                  aria-labelledby="price-range-slider"
                />
              </FormControl>
            </Box>
          </MenuItem>
        </Menu>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.status}</TableCell>
                  <TableCell>${book.price}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(book.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(book.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            <span>X</span>
          </IconButton>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes('Error') ? 'error' : 'success'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LiveBookStatus;
