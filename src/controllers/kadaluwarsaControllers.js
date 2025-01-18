const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  perusahaan,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
module.exports = {
  getKadaluwarsa: async (req, res) => {
    try {
      console.log(req.query, "INI DRI FE");
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
      const offset = limit * page;
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      const result = await obat.findAndCountAll({
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
        order: [[{ model: noBatch }, "exp", "ASC"]],
      });
      const totalRows = result.count;
      const totalPage = Math.ceil(totalRows / limit);
      return res
        .status(200)
        .send({ result, page, limit, totalRows, totalPage });
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
