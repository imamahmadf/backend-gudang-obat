"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class amprahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.amprahanItem);
      this.belongsTo(models.uptd);
    }
  }
  amprahan.init(
    {
      status: DataTypes.INTEGER,
      tanggal: DataTypes.DATE,
      uptdId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "amprahan",
    }
  );
  return amprahan;
};
