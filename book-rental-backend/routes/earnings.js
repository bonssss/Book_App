// routes/earnings.js

const express = require('express');
const { getEarnings } = require('../controllers/earningsController');
const router = express.Router();

router.get('/', getEarnings);

module.exports = router;
