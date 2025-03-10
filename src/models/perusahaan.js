"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Perusahaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.noBatch);
    }
  }
  Perusahaan.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "perusahaan",
    }
  );
  return Perusahaan;
};
