// const express = require('express');
// const { uploadBook, updateBook, deleteBook, listBooks } = require('../controllers/bookController');
// const authMiddleware = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post('/', authMiddleware, uploadBook);
// router.put('/:id', authMiddleware, updateBook);
// router.delete('/:id', authMiddleware, deleteBook);
// router.get('/', listBooks);

// module.exports = router;

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const abilitiesMiddleware = require('../middleware/abilitiesMiddleware');

const router = express.Router();

// Example route for getting books
router.get('/', authMiddleware, abilitiesMiddleware, (req, res) => {
  res.json({ message: 'Books endpoint' });
});

module.exports = router;
