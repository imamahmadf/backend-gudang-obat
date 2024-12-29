const { db, dbquery } = require("../database");
const {
  obat,
  noBatch,
  satuan,
  kategori,
  kelasterapi,
  profile,
  amprahan,
  amprahanItem,
  uptd,
  perusahaan,
  sequelize,
  StatusAmprahan,
  sumberDana,
  riwayat,
  // puskesmas,
} = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
  getLaporan: async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const kategoriId = req.params.kategoriId;
    const whereCondition = {
      statusAmprahanId: {
        [Op.between]: [1, 7],
      },
    };
    if (startDate && endDate) {
      whereCondition.tanggal = {
        [Op.between]: [startDate, endDate],
      };
    }

    console.log(req.query, "DARI FE");
    const transaction = await sequelize.transaction();
    try {
      const kategoriFE = await kategori.findAll({ attributes: ["id", "nama"] });

      const result = await obat.findAll({
        where: { kategoriId },
        attributes: ["id", "nama", "totalStok"],
        include: [
          {
            model: satuan,
            attributes: ["id", "nama"],
          },
          {
            model: noBatch,
            attributes: ["id", "harga", "noBatch", "stok"],

            include: [
              {
                model: amprahanItem,
                attributes: ["id", "sisa", "permintaan"],

                include: [
                  {
                    model: amprahan,
                    where: whereCondition,

                    attributes: ["id", "StatusAmprahanId", "tanggal"],
                  },
                ],
              },
            ],
          },
        ],
        transaction,
      });

      // Proses hasil untuk mengelompokkan data
      const groupedResult = result.map((obat) => {
        const penerimaan = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId === 5
                ? accItem + item.permintaan
                : accItem;
            }, 0)
          );
        }, 0);

        const pemakaian = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId >= 1 &&
                (item.amprahan.StatusAmprahanId <= 4 ||
                  item.amprahan.StatusAmprahanId === 7)
                ? accItem + item.permintaan
                : accItem;
            }, 0)
          );
        }, 0);

        const obatExp = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId === 6
                ? accItem + item.permintaan
                : accItem;
            }, 0)
          );
        }, 0);

        const totalAset = obat.noBatches.reduce((acc, noBatch) => {
          return acc + noBatch.stok * noBatch.harga;
        }, 0);

        const totalAsetPenerimaan = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId === 5
                ? accItem + item.permintaan * noBatch.harga
                : accItem;
            }, 0)
          );
        }, 0);

        const totalAsetPemakaian = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId >= 1 &&
                item.amprahan.StatusAmprahanId <= 4
                ? accItem + item.permintaan * noBatch.harga
                : accItem;
            }, 0)
          );
        }, 0);

        const totalAsetObatExp = obat.noBatches.reduce((acc, noBatch) => {
          return (
            acc +
            noBatch.amprahanItems.reduce((accItem, item) => {
              return item.amprahan.StatusAmprahanId === 6
                ? accItem + item.permintaan * noBatch.harga
                : accItem;
            }, 0)
          );
        }, 0);

        return {
          nama: obat.nama,
          totalStok: obat.totalStok,
          penerimaan,
          pemakaian,
          obatExp,
          totalAset,
          totalAsetPenerimaan,
          totalAsetPemakaian,
          totalAsetObatExp,
          satuan: obat.satuan,
        };
      });

      await transaction.commit();
      res.status(200).send({
        result: groupedResult,
        kategoriFE,
      });
    } catch (err) {
      await transaction.rollback();
      return res.status(500).json({
        message: err,
      });
    }
  },
};
