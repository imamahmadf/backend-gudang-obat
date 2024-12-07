const currentDate = new Date();
const perusahaans = [
  {
    id: 1,
    nama: "SO",
    createdAt: currentDate,

    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("perusahaans", perusahaans, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("perusahaans", null, {});
  },
};
