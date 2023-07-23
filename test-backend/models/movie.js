'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.ProductionHouse, { foreignKey: "prodId" })
      Movie.belongsToMany(models.Cast, { through: models.MovieCast, foreignKey: "movieId" })
    }
  };
  Movie.init({
    name: DataTypes.STRING,
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        isNotCabisat(year) {
          if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            throw new Error("Tahun ini, tidak bagus kondisinya sebaiknya tidak release film")
          }
        }
      }
    },
    genre: DataTypes.STRING,
    prodId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};