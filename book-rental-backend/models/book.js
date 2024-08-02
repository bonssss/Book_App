'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define associations here
      Book.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
      });
    }
  }

  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'unavailable'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
