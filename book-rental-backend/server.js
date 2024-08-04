require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const adminRoutes = require('./routes/admin');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

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
