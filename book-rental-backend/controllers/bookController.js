const { Book, User } = require('../models');
const { getAbility } = require('./authController');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Upload a new book
const uploadBook = async (req, res) => {
  console.log('Received fields:', req.body);
  console.log('Received file:', req.file);

  const { title, author, category, quantity, price, rented = false } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Check if the book already exists
    const existingBook = await Book.findOne({ where: { title, author } });
    if (existingBook) {
      return res.status(400).json({ error: 'Book already registered' });
    }

    // Create a new book
    const book = await Book.create({
      title,
      author,
      category,
      quantity,
      price,
      status: 'pending',
      ownerId: req.user.id,
      imageUrl,
      rented
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update book information
const updateBook = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, author, category, quantity, status, price, rented } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const ability = getAbility(req.user);
    if (!ability.can('update', book)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updatedData = {
      title,
      author,
      category,
      quantity,
      status,
      price,
      rented
    };

    if (imageUrl !== undefined) {
      updatedData.imageUrl = imageUrl;
    }

    await book.update(updatedData);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a book
const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const ability = getAbility(req.user);
    if (!ability.can('delete', book)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List books uploaded by the owner
const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { ownerId: req.user.id } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get revenue for the owner
const getRevenue = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { ownerId: req.user.id } });
    const revenue = books.reduce((total, book) => total + (book.price || 0), 0);
    res.json({ revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get dashboard stats for owner
const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.count({ where: { ownerId: req.user.id } });
    const rentedBooksCount = await Book.count({ where: { ownerId: req.user.id, rented: true } });
    const books = await Book.findAll({ where: { ownerId: req.user.id } });
    const totalRevenue = books.reduce((total, book) => total + (book.price || 0), 0);

    res.json({
      totalBooks,
      rentedBooksCount,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available books
const getAvailableBooks = async (req, res) => {
  const { category, author, title, sort, order } = req.query;

  const where = {
    status: 'available',
    rented: false
  };

  if (category) where.category = category;
  if (author) where.author = { [Op.iLike]: `%${author}%` };
  if (title) where.title = { [Op.iLike]: `%${title}%` };

  try {
    const books = await Book.findAll({
      where,
      order: [[sort || 'createdAt', order || 'DESC']],
      attributes: ['id', 'title', 'author', 'category', 'price', 'imageUrl']
    });

    if (books.length === 0) {
      res.json({ message: 'No books are currently available for rent. Please check back later.' });
    } else {
      res.json(books);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Get books by owner
const getBooksByOwner = async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({ error: 'Owner ID is required' });
  }

  try {
    const books = await Book.findAll({ where: { ownerId } });
    res.json(books);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
const rentBook = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.quantity <= 0) {
      throw new Error('No copies available');
    }

    // Update book quantities
    book.quantity -= 1;
    book.rentedQuantity += 1;
    book.rented = book.quantity === 0; // Mark as rented if no quantity left

    await book.save();

    return book;
  } catch (error) {
    console.error('Error renting book:', error);
    throw error;
  }
};
const returnBook = async (bookId) => {
  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.rentedQuantity <= 0) {
      throw new Error('No rented copies to return');
    }

    // Update book quantities
    book.quantity += 1;
    book.rentedQuantity -= 1;
    book.rented = false; // Mark as available if there are copies left

    await book.save();

    return book;
  } catch (error) {
    console.error('Error returning book:', error);
    throw error;
  }
};


module.exports = { 
  returnBook,
  uploadBook, 
  updateBook, 
  deleteBook, 
  listBooks, 
  getRevenue, 
  getDashboardStats, 
  getAvailableBooks,
  getBooksByOwner,
  rentBook
};
