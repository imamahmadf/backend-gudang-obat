"use strict";

const constraintName = "fk-obat-kelasterapi";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("obats", {
      fields: ["kelasTerapiId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "kelasterapis",
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
