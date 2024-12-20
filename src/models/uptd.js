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
      this.belongsTo(models.statusTujuan);
    }
  }
  uptd.init(
    {
      nama: DataTypes.STRING,
      statusTujuanId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "uptd",
    }
  );
  return uptd;
};
