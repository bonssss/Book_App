'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner',
      });
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
      defaultValue: 0,
    },
    status: DataTypes.STRING,
    price: DataTypes.FLOAT,
    ownerId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    rented: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};
