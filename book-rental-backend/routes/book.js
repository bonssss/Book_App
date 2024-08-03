const express = require('express');
const { uploadBook, updateBook, deleteBook, listBooks } = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, uploadBook);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.get('/', listBooks);

module.exports = router;
