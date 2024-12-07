"use strict";

const currentDate = new Date();
const roles = [
  { id: 1, name: "tamu", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, name: "total stok", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 3,
    name: "tambah barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    name: "tambah semua barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 5,
    name: "terima barang",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  { id: 6, name: "obat exp", createdAt: currentDate, updatedAt: currentDate },
  { id: 7, name: "amprahan", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 8,
    name: "super admin",
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
