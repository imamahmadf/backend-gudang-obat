"use strict";

const currentDate = new Date();
const aplikasis = [
  {
    id: 1,
    nama: "-",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "SITB",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 3,
    nama: "SIHA",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    nama: "Ketersediaan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("aplikasis", aplikasis, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("aplikasis", null, {});
  },
};
