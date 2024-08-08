'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Books', 'rentedQuantity', {
      type: Sequelize.INTEGER,
      defaultValue: 0, // Default to 0 if not set
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Books', 'rentedQuantity');
  }
};
