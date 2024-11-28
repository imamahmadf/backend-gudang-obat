"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("noBatches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noBatch: {
        type: Sequelize.STRING,
      },
      exp: {
        type: Sequelize.DATE,
      },
      harga: {
        type: Sequelize.INTEGER,
      },
      obatId: {
        type: Sequelize.INTEGER,
      },
      stok: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      perusahaanId: {
        type: Sequelize.INTEGER,
      },
      pic: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      kotak: {
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("noBatches");
  },
};
