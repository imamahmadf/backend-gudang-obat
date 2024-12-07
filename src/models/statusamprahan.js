"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StatusAmprahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.amprahan);
    }
  }
  StatusAmprahan.init(
    {
      nama: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusAmprahan",
    }
  );
  return StatusAmprahan;
};
