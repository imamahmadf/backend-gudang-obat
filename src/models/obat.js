"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class obat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.noBatch);
      this.belongsTo(models.satuan);
      this.belongsTo(models.kategori);
      this.belongsTo(models.kelasterapi);
    }
  }
  obat.init(
    {
      nama: DataTypes.STRING,
      kelasTerapiId: DataTypes.INTEGER,
      pic: DataTypes.STRING,
      satuanId: DataTypes.INTEGER,
      profileId: DataTypes.INTEGER,
      kategoriId: DataTypes.INTEGER,
      totalStok: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "obat",
    }
  );
  return obat;
};
