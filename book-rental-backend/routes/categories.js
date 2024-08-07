// routes/categories.js
const express = require('express');
const router = express.Router();
const { getCategoryCounts } = require('../controllers/categoryController');

router.get('/categories', getCategoryCounts);

module.exports = router;
