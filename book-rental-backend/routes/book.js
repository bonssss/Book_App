const express = require('express');
const multer = require('multer');
const {
  uploadBook,
  updateBook,
  deleteBook,
  listBooks,
  getRevenue,
  getDashboardStats,
  getAvailableBooks,
  getBooksByOwner
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.single('file'), uploadBook);
router.put('/:id', authMiddleware, upload.single('file'), updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.get('/', authMiddleware, listBooks);
router.get('/revenue', authMiddleware, getRevenue);
router.get('/dashboard-stats', authMiddleware, getDashboardStats);
router.get('/available', authMiddleware, getAvailableBooks);
router.get('/owner-books', authMiddleware, getBooksByOwner);

module.exports = router;
