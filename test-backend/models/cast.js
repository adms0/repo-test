'use strict';
const {
  Model, cast
} = require('sequelize');
const { options } = require('../routes');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cast.belongsToMany(models.Movie, { through: models.MovieCast, foreignKey: "castId" })
    }

    full_name() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  Cast.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: ((instance, options) => {
        if (!instance.last_name) {
          instance.last_name = instance.first_name
        }
      }),
      beforeUpdate: ((instance, options) => {
        if (!instance.last_name) {
          instance.last_name = instance.first_name
        }
      })

    },
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};