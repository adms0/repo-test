'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Casts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING, 
        allowNull : false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull : false
      },
      birth_year: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Casts');
  }
};