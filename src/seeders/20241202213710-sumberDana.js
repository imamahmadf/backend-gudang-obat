"use strict";

const currentDate = new Date();
const sumberDanas = [
  {
    id: 1,
    sumber: "APBD",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    sumber: "Buffer",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 3,
    sumber: "Program",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("sumberDanas", sumberDanas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sumberDanas", null, {});
  },
};
