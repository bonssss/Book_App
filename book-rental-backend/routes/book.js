const express = require('express');
const { uploadBook, updateBook, deleteBook, listBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, uploadBook);
router.put('/:id', authMiddleware, updateBook);  // Ensure this is :id
router.delete('/:id', authMiddleware, deleteBook);  // Ensure this is :id
router.get('/', authMiddleware, listBooks);

module.exports = router;
