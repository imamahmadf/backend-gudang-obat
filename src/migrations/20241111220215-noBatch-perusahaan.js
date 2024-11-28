"use strict";
const constraintName = "fk-noBatch-perusahaan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("nobatches", {
      fields: ["perusahaanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "perusahaans",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("nobatches", constraintName);
  },
};
