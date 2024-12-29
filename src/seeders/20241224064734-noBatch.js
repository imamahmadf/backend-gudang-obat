"use strict";

const currentDate = new Date();
const noBatches = [
  {
    id: 1,
    noBatch: "SO",
    exp: currentDate,
    harga: 0,
    obatId: 1,
    stok: 0,
    status: 2,
    perusahaanId: 1,
    pic: null,
    kotak: 0,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    noBatch: "SO",
    exp: currentDate,
    harga: 0,
    obatId: 2,
    stok: 0,
    status: 2,
    perusahaanId: 1,
    pic: null,
    kotak: 0,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

// Loop to generate the rest of the entries up to id 43
for (let i = 3; i <= 642; i++) {
  noBatches.push({
    id: i,
    noBatch: "SO",
    exp: currentDate,
    harga: 0,
    obatId: i,
    stok: 0,
    status: 2,
    perusahaanId: 1,
    pic: null,
    kotak: 0,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("noBatches", noBatches, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("noBatches", null, {});
  },
};
