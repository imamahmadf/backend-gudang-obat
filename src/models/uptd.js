"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class uptd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.amprahan);
    }
  }
  uptd.init(
    {
      nama: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "uptd",
    }
  );
  return uptd;
};
