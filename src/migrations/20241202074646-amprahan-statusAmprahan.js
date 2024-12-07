"use strict";

const constraintName = "fk-amprahan-statusAmprahan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("amprahans", {
      fields: ["StatusAmprahanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "statusAmprahans",
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
