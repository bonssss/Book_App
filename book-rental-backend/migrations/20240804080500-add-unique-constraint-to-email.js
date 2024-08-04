'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: true // Ensure email is unique
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING
    });
  }
};
