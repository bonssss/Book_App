const { Book } = require('../models');
const sequelize = require('sequelize'); // Import Sequelize

const getCategoryCounts = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const categories = await Book.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('category')), 'count']
      ],
      where: {
        ownerId: userId,
      },
      group: ['category'],
    });

    // Ensure that the count is correctly parsed
    const response = categories.map(cat => ({
      name: cat.category,
      count: parseInt(cat.dataValues.count, 10), // Fix the data access
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching category data:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getCategoryStats = async (req, res) => {
  try {
    const categories = await Book.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('category')), 'count']
      ],
      group: ['category'],
      raw: true
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getCategoryCounts,getCategoryStats
};
