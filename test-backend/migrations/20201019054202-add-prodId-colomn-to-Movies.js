'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Movies',
      'prodId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: "ProductionHouses",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Movies", "prodId")
  }
};
