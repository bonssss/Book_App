// routes/categories.js
const express = require('express');
const router = express.Router();
const { getCategoryCounts ,getCategoryStats} = require('../controllers/categoryController');


router.get('/categories', getCategoryCounts);
router.get('/admincategories',getCategoryStats);


module.exports = router;
