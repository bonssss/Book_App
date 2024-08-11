const { Book, User,Rental } = require('../models');
const { getAbility } = require('./authController');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const {  sequelize } = require('../models'); 
const moment  = require ('moment')

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
    const existingBook = await Book.findOne({ where: { title, author, ownerId: req.user.id } });
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


const getAllBooksForAdmin = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{
        model: User,
        as: 'owner', // Use the alias defined in the Book model
        attributes: ['username',], // Include necessary user attributes
      }],
      attributes: ['id', 'title', 'author', 'category', 'quantity', 'rentedQuantity', 'status', 'price', 'imageUrl', 'rented'],
    });

    if (!books.length) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.json(books);
  } catch (error) {
    console.error('Error fetching books for admin:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

const approveBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    // Find the book by ID
    const book = await Book.findByPk(bookId);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending books can be approved.' });
    }

    // Update the book's status to 'available'
    book.status = 'available';
    await book.save();

    res.status(200).json({ message: 'Book has been approved and is now available.', book });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOwnerIncome = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user from authMiddleware

  try {
    // Find all books owned by the user
    const books = await Book.findAll({
      where: { ownerId: userId },
      attributes: ['id'],
    });

    const bookIds = books.map(book => book.id);

    // Get the start and end dates for the current and previous months
    const currentMonthStart = moment().startOf('month').toDate();
    const currentMonthEnd = moment().endOf('month').toDate();
    const lastMonthStart = moment().subtract(1, 'month').startOf('month').toDate();
    const lastMonthEnd = moment().subtract(1, 'month').endOf('month').toDate();

    // Calculate total income for the current month
    const currentMonthIncome = await Rental.sum('amount', {
      where: {
        bookId: bookIds,
        createdAt: {
          [Op.between]: [currentMonthStart, currentMonthEnd],
        },
      },
    });

    // Calculate total income for the previous month
    const lastMonthIncome = await Rental.sum('amount', {
      where: {
        bookId: bookIds,
        createdAt: {
          [Op.between]: [lastMonthStart, lastMonthEnd],
        },
      },
    });

    res.json({
      currentMonthIncome: currentMonthIncome || 0,
      lastMonthIncome: lastMonthIncome || 0,
    });
  } catch (error) {
    console.error('Error fetching owner income:', error);
    res.status(500).json({ error: error.message });
  }
};
const getEarningsSummary = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available in req.user from authMiddleware

  try {
    // Get start and end dates for the last 6 months
    const now = moment();
    const endDate = now.clone().startOf('month');
    const startDate = endDate.clone().subtract(6, 'months');

    // Get start and end dates for the same period last year
    const lastYearEndDate = endDate.clone().subtract(1, 'year');
    const lastYearStartDate = lastYearEndDate.clone().subtract(6, 'months');

    // Prepare an array to hold results
    const currentYearSummary = [];
    const lastYearSummary = [];

    // Function to get monthly income
    const getMonthlyIncome = async (start, end) => {
      return Rental.findAll({
        attributes: [
          [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalIncome']
        ],
        where: {
          bookId: {
            [Op.in]: sequelize.literal(`(SELECT id FROM "Books" WHERE "ownerId" = ${userId})`)
          },
          createdAt: {
            [Op.between]: [start.toDate(), end.toDate()],
          },
        },
        group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
        order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']],
      });
    };

    // Get current year earnings
    for (let i = 0; i < 6; i++) {
      const monthStart = startDate.clone().add(i, 'months');
      const monthEnd = monthStart.clone().endOf('month');
      const result = await getMonthlyIncome(monthStart, monthEnd);
      currentYearSummary.push({
        month: monthStart.format('YYYY-MM'),
        earnings: result[0]?.dataValues.totalIncome || 0
      });
    }

    // Get last year earnings
    for (let i = 0; i < 6; i++) {
      const monthStart = lastYearStartDate.clone().add(i, 'months');
      const monthEnd = monthStart.clone().endOf('month');
      const result = await getMonthlyIncome(monthStart, monthEnd);
      lastYearSummary.push({
        month: monthStart.format('YYYY-MM'),
        earnings: result[0]?.dataValues.totalIncome || 0
      });
    }

    res.json({
      currentYear: currentYearSummary,
      lastYear: lastYearSummary,
    });
  } catch (error) {
    console.error('Error fetching earnings summary:', error);
    res.status(500).json({ error: error.message });
  }
};


const getAdminIncome = async (req, res) => {
  try {
    // Get the start and end dates for the current and previous months
    const currentMonthStart = moment().startOf('month').toDate();
    const currentMonthEnd = moment().endOf('month').toDate();
    const lastMonthStart = moment().subtract(1, 'month').startOf('month').toDate();
    const lastMonthEnd = moment().subtract(1, 'month').endOf('month').toDate();

    // Calculate total income for the current month
    const currentMonthIncome = await Rental.sum('amount', {
      where: {
        createdAt: {
          [Op.between]: [currentMonthStart, currentMonthEnd],
        },
      },
    });

    // Calculate total income for the previous month
    const lastMonthIncome = await Rental.sum('amount', {
      where: {
        createdAt: {
          [Op.between]: [lastMonthStart, lastMonthEnd],
        },
      },
    });

    // Get the start and end dates for the last 6 months
    const now = moment();
    const endDate = now.clone().startOf('month');
    const startDate = endDate.clone().subtract(6, 'months');

    // Get start and end dates for the same period last year
    const lastYearEndDate = endDate.clone().subtract(1, 'year');
    const lastYearStartDate = lastYearEndDate.clone().subtract(6, 'months');

    // Prepare an array to hold results
    const currentYearSummary = [];
    const lastYearSummary = [];

    // Function to get monthly income
    const getMonthlyIncome = async (start, end) => {
      return Rental.findAll({
        attributes: [
          [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'totalIncome']
        ],
        where: {
          createdAt: {
            [Op.between]: [start.toDate(), end.toDate()],
          },
        },
        group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
        order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']],
      });
    };

    // Get current year earnings
    for (let i = 0; i < 6; i++) {
      const monthStart = startDate.clone().add(i, 'months');
      const monthEnd = monthStart.clone().endOf('month');
      const result = await getMonthlyIncome(monthStart, monthEnd);
      currentYearSummary.push({
        month: monthStart.format('YYYY-MM'),
        earnings: result[0]?.dataValues.totalIncome || 0
      });
    }

    // Get last year earnings
    for (let i = 0; i < 6; i++) {
      const monthStart = lastYearStartDate.clone().add(i, 'months');
      const monthEnd = monthStart.clone().endOf('month');
      const result = await getMonthlyIncome(monthStart, monthEnd);
      lastYearSummary.push({
        month: monthStart.format('YYYY-MM'),
        earnings: result[0]?.dataValues.totalIncome || 0
      });
    }

    // Send the response
    res.json({
      currentMonthIncome: currentMonthIncome || 0,
      lastMonthIncome: lastMonthIncome || 0,
      earningsSummary: {
        currentYear: currentYearSummary,
        lastYear: lastYearSummary,
      },
    });
  } catch (error) {
    console.error('Error fetching admin income and earnings summary:', error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { 
  getAdminIncome,
  getOwnerIncome,
  returnBook,
  uploadBook, 
  updateBook, 
  deleteBook, 
  listBooks, 
  getRevenue, 
  getDashboardStats, 
  getAvailableBooks,
  getBooksByOwner,
  rentBook,getAllBooksForAdmin,
  approveBook,getEarningsSummary
};
