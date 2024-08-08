const { Book } = require('../models');
const { Op } = require('sequelize');

const calculateMonthlyIncome = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Find rented books updated in the current month
    const rentedBooks = await Book.findAll({
      where: {
        ownerId: userId,
        rented: true,
        updatedAt: { [Op.gte]: startOfMonth }
      }
    });

    if (!rentedBooks.length) {
      return 0; // No rented books
    }

    // Calculate total income
    const income = rentedBooks.reduce((total, book) => {
      // Use rentedQuantity and price for calculation
      const rentedQty = book.rentedQuantity || 0;
      const price = book.price || 0;
      return total + (price * rentedQty);
    }, 0);

    return income;
  } catch (error) {
    console.error('Error calculating monthly income:', error);
    throw error;
  }
};

module.exports = { calculateMonthlyIncome };
