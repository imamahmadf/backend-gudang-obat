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
  getRusak: async (req, res) => {
    try {
      const result = await amprahanItem.findAll({
        include: [
          { model: amprahan, where: { StatusAmprahanId: 7 } },
          { model: noBatch, include: [{ model: obat }] },
        ],
      });

      return res.status(200).json({
        message: "data berhasil diambil",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  postItemRusak: async (req, res) => {
    console.log(req.query, "CEK DATA UNTUK ALOKASI DAN AMPRAHAN");
    const transaction = await sequelize.transaction();
    try {
      const {
        noBatchId,
        userId,
        amprahanId,
        permintaan,
        stokAwal,
        obatId,
        catatan,
      } = req.query;

      const ubahStok = await noBatch.update(
        {
          stok: stokAwal - permintaan,
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
          totalStok: sequelize.literal(`totalStok - ${parseInt(permintaan)}`),
        },
        {
          where: {
            id: parseInt(obatId),
          },
          transaction,
        }
      );

      const getTambahStok = await obat.findOne({
        where: {
          id: parseInt(obatId),
        },
        transaction,
      });

      const result = await amprahanItem.create(
        {
          noBatchId,
          userId,
          amprahanId,
          permintaan,
          sisa: getTambahStok.totalStok,
          catatan,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).json({
        message: "berhasi menambahkan aobat rusak item",
        result,
      });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  postRusak: async (req, res) => {
    const tujuanObatRusakId = 26;
    const statusAmprahanObatRusakId = 7;
    try {
      const result = await amprahan.create({
        uptdId: tujuanObatRusakId,
        StatusAmprahanId: statusAmprahanObatRusakId,
        tanggal: new Date(),
        isOpen: 1,
      });
      return res.status(200).json({
        message: "berhasi tambah data",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  closeRusak: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await amprahan.update(
        { isOpen: 0 },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
