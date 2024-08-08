'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define associations here if needed
      Book.belongsTo(models.User, { foreignKey: 'ownerId' });
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    category: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rentedQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default to 0 if not set
    },
    status: DataTypes.STRING,
    price: DataTypes.FLOAT,
    ownerId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING, // Added field for image URL
    rented: DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};
