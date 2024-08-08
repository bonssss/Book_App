require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const adminRoutes = require('./routes/admin');
const { sequelize } = require('./models');
const paymentRoutes = require('./routes/paymentRoutes');
const categories = require('./routes/categories');
const earningsRoutes = require('./routes/earnings');
const incomeRoutes = require('./routes/incomeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Adjust this based on your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Routes for different functionalities
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', categories);
app.use('/api/earnings', earningsRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api', bookRoutes);


// Start server and sync database
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    await sequelize.sync(); // Sync models with the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
