"use strict";

const constraintName = "fk-uptd-statusTujuan";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("uptds", {
      fields: ["statusTujuanId"],
      type: "foreign key",
      name: constraintName,
      references: {
        //Required field
        table: "statusTujuans",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("uptds", constraintName);
  },
};
