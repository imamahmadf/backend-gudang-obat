"use strict";

const constraintName = "fk-amprahanItem-amprahan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("amprahanItems", {
      fields: ["amprahanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "amprahans",
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
