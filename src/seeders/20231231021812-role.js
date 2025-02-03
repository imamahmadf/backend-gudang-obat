"use strict";

const currentDate = new Date();
const roles = [
  { id: 1, name: "pengunjung", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, name: "Tamu", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 3,
    name: "Penanggung jawab Barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    name: "Penambah Barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 5,
    name: "Penerima Barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 6,
    name: "Pengelola Obat EXP",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  { id: 7, name: "Apoteker", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 8,
    name: "Administrator",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
