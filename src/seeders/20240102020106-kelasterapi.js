const currentDate = new Date();
const kelasterapis = [
  {
    id: 1,
    nama: "Antibakteri",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  { id: 2, nama: "Antivirus", createdAt: currentDate, updatedAt: currentDate },
  { id: 3, nama: "Antiulkus", createdAt: currentDate, updatedAt: currentDate },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kelasterapis", kelasterapis, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("kelasterapis", null, {});
  },
};
