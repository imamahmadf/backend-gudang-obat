"use strict";

const constraintName = "fk-alokasi-amprahan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("amprahans", {
      fields: ["alokasiId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "alokasis",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("amprahans", constraintName);
  },
};
