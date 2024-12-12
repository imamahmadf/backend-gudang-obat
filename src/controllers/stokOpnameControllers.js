const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
} = require("../models");

module.exports = {
  getStokOpname: async (req, res) => {
    const { profileId } = req.params;

    try {
      console.log(profileId, "INI PROFILE IDDDD");

      const result = await obat.findAll({
        where: {
          profileId,
        },
        include: [
          {
            model: noBatch,
            attributes: ["noBatch", "exp", "status", "id", "stok"],
          },
        ],
      });
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  tutupSO: async (req, res) => {
    console.log(req.body, "INI TUTUP SOOOOO");
    const transaction = await sequelize.transaction();
    const dataFE = req.body;

    try {
      const newAmprahan = await amprahan.create(
        {
          uptdId: 1,
          tanggal: new Date(),
          StatusAmprahanId: 8,
          isOpen: 0,
        },
        { transaction }
      );

      const amprahanItems = dataFE.map((item) => ({
        amprahanId: newAmprahan.id,
        permintaan: 0,

        sisa: item.totalStok,
        noBatchId: item.noBatches[0],
        userId: 1,
      }));

      await amprahanItem.bulkCreate(amprahanItems, { transaction });

      await transaction.commit();
      return res.status(200).json({
        message: "berhasil tutup SO",
      });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
