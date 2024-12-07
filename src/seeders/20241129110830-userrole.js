const currentDate = new Date();
const userroles = [
  {
    id: 1,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 1,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 2,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 3,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 3,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 4,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 4,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 5,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 5,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 6,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 6,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 7,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 7,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 8,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    roleId: 8,
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("userroles", userroles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("userroles", null, {});
  },
};
