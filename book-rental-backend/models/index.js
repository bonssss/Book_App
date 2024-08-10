const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('book_rent', 'postgres', '2112', {
  host: 'localhost',
  dialect: 'postgres',
});

// Import models
const User = require('./User')(sequelize, DataTypes);
const Book = require('./Book')(sequelize, DataTypes);
const Rental = require('./Rental')(sequelize, DataTypes);

// Initialize associations
User.associate({ Book, Rental });
Book.associate({ User, Rental });
Rental.associate({ User, Book });

module.exports = {
  sequelize,
  User,
  Book,
  Rental,
};
