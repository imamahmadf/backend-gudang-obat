"use strict";

const constraintName = "fk-obat-aplikasi";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Menambahkan constraint foreign key
    await queryInterface.addConstraint("obats", {
      fields: ["aplikasiId"],
      type: "foreign key",
      name: constraintName,
      references: {
        table: "aplikasis",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    // Menghapus constraint jika ada
    await queryInterface.removeConstraint("obats", constraintName);
  },
};
