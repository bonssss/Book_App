const express = require('express');
const { uploadBook, updateBook, deleteBook, listBooks ,getRevenue,getDashboardStats,getAvailableBooks} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/', authMiddleware, uploadBook);
router.put('/:id', authMiddleware, updateBook);  // Ensure this is :id
router.delete('/:id', authMiddleware, deleteBook);  // Ensure this is :id
router.get('/', authMiddleware, listBooks);
router.get('/revenue', authMiddleware, getRevenue);
router.get('/dashboard-stats', authMiddleware, getDashboardStats);
router.get('/available', getAvailableBooks);



module.exports = router;
