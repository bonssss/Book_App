const express = require('express');
const router = express.Router();
const { postRentBooks, getVerifyRental, postReturnBook } = require('../controllers/rentController');

router.post('/rent-books', postRentBooks);
router.get('/verify-rental/:rentalId', getVerifyRental);
router.post('/return-book', postReturnBook);

module.exports = router;
