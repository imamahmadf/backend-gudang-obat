"use strict";

const constraintName = "fk-amprahanItem-noBatch";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("amprahanItems", {
      fields: ["noBatchId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "noBatches",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("amprahanItems", constraintName);
  },
};
