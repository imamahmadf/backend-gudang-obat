"use strict";

const currentDate = new Date();
const statusTujuans = [
  {
    id: 1,
    status: "obat keluar",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    status: "obat masuk",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 3,
    status: "stok opname",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statusTujuans", statusTujuans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statusTujuans", null, {});
  },
};
