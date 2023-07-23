'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieCast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // MovieCast.belongsTo(models.Movie, {foreignKey: "movieId"})
      // MovieCast.belongsTo(models.Cast, {foreignKey: "castId"})
    }
  };
  MovieCast.init({
    movieId: DataTypes.INTEGER,
    castId: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "role tidak boleh kosong"
        }
      }

    }

  }, {
    sequelize,
    modelName: 'MovieCast',
  });
  return MovieCast;
};