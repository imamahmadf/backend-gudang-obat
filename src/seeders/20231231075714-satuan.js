const currentDate = new Date();
const satuans = [
  { id: 1, nama: "Tablet", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, nama: "Kapsul", createdAt: currentDate, updatedAt: currentDate },
  { id: 3, nama: "Botol", createdAt: currentDate, updatedAt: currentDate },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("satuans", satuans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("satuans", null, {});
  },
};
