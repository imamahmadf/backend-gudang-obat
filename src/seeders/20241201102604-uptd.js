const currentDate = new Date();
const uptds = [
  {
    id: 1,
    nama: "SO",
    createdAt: currentDate,
    statusTujuanId: 3,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "Puskesmas Senaken",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 3,
    nama: "Puskesmas Padang Pangrapat",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 4,
    nama: "Puskesmas Kuaro",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 5,
    nama: "Puskesmas Lolo",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 6,
    nama: "Puskesmas Muser",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 7,
    nama: "Puskesmas batu Kajang",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 8,
    nama: "Puskesmas Muara Komam",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 9,
    nama: "Puskesmas Kuaro",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 10,
    nama: "Puskesmas Long Ikis",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 11,
    nama: "Puskesmas Long Kali",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 12,
    nama: "Puskesmas Kayungo",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 13,
    nama: "Puskesmas Krayan",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 14,
    nama: "Puskesmas tanjung Aru",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 15,
    nama: "Puskesmas Paser belengkong",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 16,
    nama: "Puskesmas SP 1",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 17,
    nama: "Puskesmas SP 2",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 18,
    nama: "Puskesmas Kerang",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 19,
    nama: "Puskesmas Tanjung Aru",
    createdAt: currentDate,
    statusTujuanId: 1,
    updatedAt: currentDate,
  },
  {
    id: 20,
    nama: "Puskesmas Tanah Grogot",
    createdAt: currentDate,
    statusTujuanId: 1,
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
