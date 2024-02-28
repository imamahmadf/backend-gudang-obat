const currentDate = new Date();
const uptds = [
  {
    id: 1,
    nama: "Tanah Grogot",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "Senaken",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 3,
    nama: "Padang Pangrapat",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 4,
    nama: "Kuaro",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 5,
    nama: "Lolo",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 6,
    nama: "Muser",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 7,
    nama: "batu Kajang",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 8,
    nama: "Muara Komam",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 9,
    nama: "Kuaro",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 10,
    nama: "Long Ikis",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 11,
    nama: "Long Kali",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 12,
    nama: "Kayungo",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 13,
    nama: "Krayan",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 14,
    nama: "tanjung Aru",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 15,
    nama: "Paser belengkong",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 16,
    nama: "SP 1",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 17,
    nama: "SP 2",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 18,
    nama: "Kerang",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
  {
    id: 19,
    nama: "Tanjung Aru",
    createdAt: currentDate,
    status: 1,
    updatedAt: currentDate,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("uptds", uptds, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("uptds", null, {});
  },
};
