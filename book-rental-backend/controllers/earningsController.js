const { Rental } = require('../models'); // Replace with your actual model
const sequelize = require('sequelize'); // Import Sequelize

const getEarnings = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate input
  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }

  try {
    // Fetch earnings data from the database
    const earnings = await Rental.findAll({
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('rental_date')), 'month'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_earnings']
      ],
      where: {
        rental_date: {
          [sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      group: [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('rental_date'))],
      order: [[sequelize.fn('DATE_TRUNC', 'month', sequelize.col('rental_date')), 'ASC']]
    });

    // Format the response
    const response = earnings.map(e => ({
      month: e.dataValues.month,
      total_earnings: parseFloat(e.dataValues.total_earnings),
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching earnings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getEarnings,
};
