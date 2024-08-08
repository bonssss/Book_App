const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('book_rent', 'postgres', '2112', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./User')(sequelize, DataTypes);
const Book = require('./Book')(sequelize, DataTypes);

// Initialize associations
User.associate({ Book });
Book.associate({ User });

module.exports = {
  sequelize,
  User,
  Book,
};
