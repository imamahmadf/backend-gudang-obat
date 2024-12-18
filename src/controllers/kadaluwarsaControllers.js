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
  getKadaluwarsa: async (req, res) => {
    try {
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      const result = await obat.findAll({
        include: [
          {
            model: noBatch,
            where: {
              status: 1,
              exp: {
                [Op.lt]: sixMonthsFromNow, // Filter untuk exp kurang dari 6 bulan dari hari ini
              },
            },
            include: [
              {
                model: perusahaan,
                attributes: ["nama"],
              },
            ],
          },
        ],
      });

      return res.status(200).send({ result });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  kadaluwarsa: async (req, res) => {
    const { obatId, stokEXP, perusahaanId, noBatchId, userId } = req.body;
    const expId = 25;
    const transaction = await sequelize.transaction();
    console.log(req.body, "KADALUWARSAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const tanggal = new Date();
    try {
      const buatAmprahan = await amprahan.create(
        {
          uptdId: expId,
          tanggal,
          StatusAmprahanId: 6,
          isOpen: 0,
        },
        { transaction }
      );

      const ubahStok = await noBatch.update(
        {
          stok: 0,
        },
        {
          where: {
            id: noBatchId,
          },
          transaction,
        }
      );

      const ubahTotalStok = await obat.update(
        {
          totalStok: sequelize.literal(`totalStok - ${parseInt(stokEXP)}`),
        },
        {
          where: {
            id: parseInt(obatId),
          },
        },
        { transaction }
      );

      const getTambahStok = await obat.findOne(
        {
          where: {
            id: parseInt(obatId),
          },
        },
        { transaction }
      );
      const result = await amprahanItem.create(
        {
          noBatchId,
          userId,
          amprahanId: buatAmprahan.id,
          permintaan: stokEXP,
          sisa: getTambahStok.totalStok,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).json({
        message: "berhasi menghapus obat",
      });
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
