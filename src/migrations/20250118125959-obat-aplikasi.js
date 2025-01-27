"use strict";

const constraintName = "fk-obat-aplikasi";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("obats", {
      fields: ["aplikasiId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "aplikasis",
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
