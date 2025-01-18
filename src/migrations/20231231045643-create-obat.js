"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("obats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kelasTerapiId: {
        type: Sequelize.INTEGER,
      },

      satuanId: {
        type: Sequelize.INTEGER,
      },
      profileId: {
        type: Sequelize.INTEGER,
      },
      kategoriId: {
        type: Sequelize.INTEGER,
      },
      sumberDanaId: {
        type: Sequelize.INTEGER,
      },
      totalStok: {
        type: Sequelize.INTEGER,
      },
      aplikasiId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("obats");
  },
};
