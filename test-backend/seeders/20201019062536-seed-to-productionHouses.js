'use strict';

const fs = require("fs")
const dataProductionHouses = JSON.parse(fs.readFileSync("./productionHouses.json", "utf8"))

module.exports = {
  up: (queryInterface, Sequelize) => {
    let dataPh = dataProductionHouses.map(ph => {
      return {
        ...ph,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return queryInterface.bulkInsert("ProductionHouses", dataPh, {})
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete("ProductionHouses", null, {})
  }
};
