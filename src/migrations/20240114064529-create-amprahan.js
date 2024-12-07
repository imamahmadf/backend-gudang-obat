"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("amprahans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      StatusAmprahanId: {
        type: Sequelize.INTEGER,
      },
      alokasiId: { type: Sequelize.INTEGER },
      tanggal: {
        type: Sequelize.DATE,
      },
      uptdId: {
        type: Sequelize.INTEGER,
      },
      isOpen: {
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
    await queryInterface.dropTable("amprahans");
  },
};
