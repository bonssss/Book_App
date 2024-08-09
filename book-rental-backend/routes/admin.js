const express = require('express');
const { approveOwner  } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const {getOwnerStats,deleteOwner} = require ('../controllers/adminController')

const router = express.Router();

// Add a middleware to ensure only admin can access this route
router.put('/approve-owner/:id', authMiddleware, approveOwner);
router.get('/owner-stats', getOwnerStats);
router.delete('/delete-owner/:id', authMiddleware, deleteOwner);


module.exports = router;
