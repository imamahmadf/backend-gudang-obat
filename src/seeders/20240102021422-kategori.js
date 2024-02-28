const currentDate = new Date();
const kategoris = [
  { id: 1, nama: "Narkotika", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, nama: "BMHP", createdAt: currentDate, updatedAt: currentDate },
  { id: 3, nama: "Program", createdAt: currentDate, updatedAt: currentDate },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kategoris", kategoris, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kategoris", null, {});
  },
};
