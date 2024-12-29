const currentDate = new Date();
const satuans = [
  { id: 1, nama: "Tablet", createdAt: currentDate, updatedAt: currentDate },
  { id: 2, nama: "Kaplet", createdAt: currentDate, updatedAt: currentDate },
  { id: 3, nama: "Kapsul", createdAt: currentDate, updatedAt: currentDate },
  { id: 4, nama: "Botol", createdAt: currentDate, updatedAt: currentDate },
  { id: 5, nama: "Ampul", createdAt: currentDate, updatedAt: currentDate },
  { id: 6, nama: "Vial", createdAt: currentDate, updatedAt: currentDate },
  { id: 7, nama: "Picis", createdAt: currentDate, updatedAt: currentDate },
  { id: 8, nama: "Roll", createdAt: currentDate, updatedAt: currentDate },
  { id: 9, nama: "Colf", createdAt: currentDate, updatedAt: currentDate },
  { id: 10, nama: "Kit", createdAt: currentDate, updatedAt: currentDate },
  { id: 11, nama: "Sachet", createdAt: currentDate, updatedAt: currentDate },
  { id: 12, nama: "Tube", createdAt: currentDate, updatedAt: currentDate },
  { id: 13, nama: "Blister", createdAt: currentDate, updatedAt: currentDate },
  { id: 14, nama: "Test", createdAt: currentDate, updatedAt: currentDate },
  { id: 15, nama: "Lembar", createdAt: currentDate, updatedAt: currentDate },
  { id: 16, nama: "Strip", createdAt: currentDate, updatedAt: currentDate },
  { id: 17, nama: "Box", createdAt: currentDate, updatedAt: currentDate },
  { id: 18, nama: "Paket", createdAt: currentDate, updatedAt: currentDate },
  { id: 19, nama: "Galon", createdAt: currentDate, updatedAt: currentDate },
  { id: 20, nama: "Kg", createdAt: currentDate, updatedAt: currentDate },
  { id: 21, nama: "Unit", createdAt: currentDate, updatedAt: currentDate },
  { id: 22, nama: "Amplop", createdAt: currentDate, updatedAt: currentDate },
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
