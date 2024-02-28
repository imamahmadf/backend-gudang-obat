"use strict";

const constraintName = "fk-obat-satuan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("obats", {
      fields: ["satuanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "satuans",
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
