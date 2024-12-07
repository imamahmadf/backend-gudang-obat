"use strict";

const constraintName = "fk-riwayat-obat";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("riwayats", {
      fields: ["obatId"],
      type: "foreign key",
      name: constraintName,
      references: {
        table: "obats",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("riwayats", constraintName);
  },
};
