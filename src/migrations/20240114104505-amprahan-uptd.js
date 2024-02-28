"use strict";

const constraintName = "fk-amprahan-uptd";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("amprahans", {
      fields: ["uptdId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "uptds",
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
