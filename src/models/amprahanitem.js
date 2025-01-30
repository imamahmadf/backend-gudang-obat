"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class amprahanItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.noBatch);
      this.belongsTo(models.amprahan);
    }
  }
  amprahanItem.init(
    {
      noBatchId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      amprahanId: DataTypes.INTEGER,
      permintaan: DataTypes.INTEGER,
      sisa: DataTypes.INTEGER,
      catatan: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    { paranoid: true, sequelize, modelName: "amprahanItem" }
  );
  return amprahanItem;
};
