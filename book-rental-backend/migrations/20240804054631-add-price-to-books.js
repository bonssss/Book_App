// migrations/xxxx-add-price-to-books.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'price', {
      type: Sequelize.FLOAT,
      allowNull: false, // or true, depending on whether you want this field to be required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'price');
  }
};
