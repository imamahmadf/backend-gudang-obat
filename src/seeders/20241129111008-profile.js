const currentDate = new Date();
const profiles = [
  {
    id: 1,
    nama: "Admin APTEKA",
    birthdate: currentDate,
    profilepic: null,
    nip: null,
    jabatan: null,
    userId: "mlG8LvS7zHP3DIVgESfGyMpWz142",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("profiles", profiles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("profiles", null, {});
  },
};
