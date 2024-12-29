const currentDate = new Date();
const kategoris = [
  {
    id: 1,
    nama: "tablet Rutin",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 2,
    nama: "SALEP & INJEKSI",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 3,
    nama: "SIRUP / SUSPENSI / EMULSI",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  { id: 4, nama: "BMHP", createdAt: currentDate, updatedAt: currentDate },
  {
    id: 5,
    nama: "CAIRAN / BMHP CAIR / REAGENSIA",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 9,
    nama: "BMHP & VAKSIN RUTIN",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 6,
    nama: "PSIKO-NARKO",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 8,
    nama: "BMHP gigi",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 7,
    nama: "Program",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
  {
    id: 10,
    nama: "Tambahan",
    createdAt: currentDate,
    updatedAt: currentDate,
  },
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
