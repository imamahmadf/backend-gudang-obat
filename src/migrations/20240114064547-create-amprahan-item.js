"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "amprahanItems",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        noBatchId: {
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
        },
        amprahanId: {
          type: Sequelize.INTEGER,
        },
        permintaan: {
          type: Sequelize.INTEGER,
        },
        sisa: {
          type: Sequelize.INTEGER,
        },
        catatan: {
          type: Sequelize.STRING,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true,
        deletedAt: "soft_delete",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("amprahanItems");
  },
};
