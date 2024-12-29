"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user);
      this.hasMany(models.riwayat);
      this.hasMany(models.obat);
    }
  }
  profile.init(
    {
      nama: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      profilePic: DataTypes.STRING,
      nip: DataTypes.INTEGER,
      userId: DataTypes.STRING,
      jabatan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "profile",
    }
  );
  return profile;
};
