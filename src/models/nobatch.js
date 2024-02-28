"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class noBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.obat);
      this.hasMany(models.amprahanItem);
    }
  }
  noBatch.init(
    {
      noBatch: DataTypes.STRING,
      exp: DataTypes.DATE,
      harga: DataTypes.INTEGER,
      obatId: DataTypes.INTEGER,
      stok: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "noBatch",
    }
  );
  return noBatch;
};
