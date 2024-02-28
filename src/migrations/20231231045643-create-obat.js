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
      },
      kelasTerapiId: {
        type: Sequelize.INTEGER,
      },
      pic: {
        type: Sequelize.STRING,
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
      totalStok: {
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
