const express = require('express');
const { Chapa } = require('chapa-nodejs');

const router = express.Router();

const chapa = new Chapa({
  secretKey: process.env.CHAPA_SECRET_KEY, // Ensure your secret key is stored in .env file
});

// Initialize a transaction
router.post('/initialize', async (req, res) => {
  const { first_name, last_name, email, amount, currency = 'ETB', callback_url, return_url } = req.body;

  try {
    const tx_ref = await chapa.generateTransactionReference(); // Generate transaction reference
    const response = await chapa.initialize({
      first_name,
      last_name,
      email,
      amount: amount.toString(),
      currency,
      tx_ref,
      callback_url,
      return_url,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify a transaction
router.get('/verify/:tx_ref', async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const response = await chapa.verify({ tx_ref });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
