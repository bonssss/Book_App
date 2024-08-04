const express = require('express');
const { approveOwner } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a middleware to ensure only admin can access this route
router.put('/approve-owner/:id', authMiddleware, approveOwner);

module.exports = router;
