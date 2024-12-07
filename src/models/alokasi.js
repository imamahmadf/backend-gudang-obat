"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alokasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.amprahan);
    }
  }
  alokasi.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "alokasi",
    }
  );
  return alokasi;
};
