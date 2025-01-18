"use strict";

const constraintName = "fk-obat-sumberDana";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("obats", {
      fields: ["sumberDanaId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "sumberDanas",
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
