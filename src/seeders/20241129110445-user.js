const currentDate = new Date();
const users = [
  {
    id: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    firebaseProviderId: "password",
    email: "apteka.paser@gmail.com",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
