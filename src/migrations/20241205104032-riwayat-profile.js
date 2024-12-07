"use strict";

const constraintName = "fk-riwayat-profile";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("riwayats", {
      fields: ["profileId"],
      type: "foreign key",
      name: constraintName,
      references: {
        table: "profiles",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("riwayats", constraintName);
  },
};
