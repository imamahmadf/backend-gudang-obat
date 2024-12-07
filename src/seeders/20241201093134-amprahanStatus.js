"use strict";

const currentDate = new Date();
const statusAmprahans = [
  { id: 1, nama: "Amprahan", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, nama: "Bon", createdAt: currentDate, updatedAt: currentDate },
  { id: 3, nama: "Program", createdAt: currentDate, updatedAt: currentDate },
  { id: 4, nama: "Alokasi", createdAt: currentDate, updatedAt: currentDate },
  { id: 5, nama: "Obat Masuk", createdAt: currentDate, updatedAt: currentDate },
  { id: 6, nama: "Obat EXP", createdAt: currentDate, updatedAt: currentDate },
  { id: 7, nama: "Obat Rusak", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 8,
    nama: "Stok Opname",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("statusAmprahans", statusAmprahans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("statusAmprahans", null, {});
  },
};
