const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadBook, updateBook, deleteBook, listBooks, getRevenue, getDashboardStats, getAvailableBooks,getBooksByOwner } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

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

const router = express.Router();

// Routes
router.post('/', authMiddleware, upload.single('imageUrl'), uploadBook);
router.put('/:id', authMiddleware, upload.single('imageUrl'), updateBook);  // Ensure this is :id
router.delete('/:id', authMiddleware, deleteBook);  // Ensure this is :id
router.get('/', authMiddleware, listBooks);
router.get('/revenue', authMiddleware, getRevenue);
router.get('/dashboard-stats', authMiddleware, getDashboardStats);
router.get('/available', getAvailableBooks);
router.get('/', authMiddleware, getBooksByOwner);
module.exports = router;
