"use strict";

const constraintName = "fk-obat-kategori";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("obats", {
      fields: ["kategoriId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "kategoris",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("obats", constraintName);
  },
};
