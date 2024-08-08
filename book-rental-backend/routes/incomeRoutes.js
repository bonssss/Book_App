// server/routes/incomeRoutes.js
const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/monthly', authMiddleware, async (req, res) => {
  try {
    const income = await incomeController.calculateMonthlyIncome(req.user.id);
    res.json({ income });
  } catch (error) {
    console.error('Error fetching monthly income:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
