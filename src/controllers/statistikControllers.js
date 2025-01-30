const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
  alokasi,
} = require("../models");
const { Op, where } = require("sequelize");

module.exports = {
  getDetailObat: async (req, res) => {
    const obatId = req.params.obatId;
    const year = parseInt(req.query.year) || 2025;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    try {
      const result = await amprahanItem.findAll({
        include: [
          {
            model: noBatch,
            required: true,
            where: { status: 1 },
            include: [{ model: obat, required: true, where: { id: obatId } }],
          },
          { model: amprahan, include: [{ model: uptd }] },
        ],
        where: {
          createdAt: {
            [Op.between]: [
              new Date(`${year}-01-01`),
              new Date(`${year}-12-31`),
            ],
          },
        },
      });

      // Mengelompokkan data berdasarkan bulan dan menghitung total permintaan
      const groupedByMonth = Array.from({ length: 12 }, (_, i) => {
        const itemsInMonth = result.filter(
          (item) => new Date(item.createdAt).getMonth() === i
        );
        const totalPemakaian = itemsInMonth
          .filter(
            (item) =>
              item.amprahan.StatusAmprahanId >= 1 &&
              (item.amprahan.StatusAmprahanId <= 4 ||
                item.amprahan.StatusAmprahanId === 7)
          )
          .reduce((sum, item) => sum + item.permintaan, 0);
        const totalPenerimaan = itemsInMonth
          .filter((item) => item.amprahan.StatusAmprahanId === 5)
          .reduce((sum, item) => sum + item.permintaan, 0);

        const totalEXP = itemsInMonth
          .filter((item) => item.amprahan.StatusAmprahanId === 6)
          .reduce((sum, item) => sum + item.permintaan, 0);

        return {
          month: i + 1,
          totalPermintaan: {
            pengeluaran: totalPemakaian,
            penerimaan: totalPenerimaan,
            exp: totalEXP,
          },
        };
      });

      return res.status(200).send({ result: groupedByMonth });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getTujuanObat: async (req, res) => {
    const obatId = req.params.obatId;
    const year = parseInt(req.query.year) || 2025;
    try {
      const result = await obat.findAll({
        where: {
          id: obatId,
        },
        include: [
          {
            model: noBatch,
            where: { status: 1 },
            include: [
              {
                model: amprahanItem,
                where: {
                  createdAt: {
                    [Op.between]: [
                      new Date(`${year}-01-01`),
                      new Date(`${year}-12-31`),
                    ],
                  },
                },
                include: [
                  {
                    model: amprahan,
                    where: {
                      StatusAmprahanId: {
                        [Op.in]: [1, 2, 3, 4, 7],
                      },
                    },
                    include: [{ model: uptd }],
                  },
                ],
              },
            ],
          },
        ],
      });

      // Mengelompokkan berdasarkan uptdId dan menghitung total permintaan
      const groupedByUptdId = result.reduce((acc, obat) => {
        obat.noBatches.forEach((batch) => {
          batch.amprahanItems.forEach((item) => {
            const uptdId = item.amprahan.uptdId;
            const permintaan = item.permintaan;
            const uptdNama = item.amprahan.uptd.nama;

            if (!acc[uptdId]) {
              acc[uptdId] = { totalPermintaan: 0, uptdNama };
            }
            acc[uptdId].totalPermintaan += permintaan;
          });
        });
        return acc;
      }, {});

      return res.send(
        Object.entries(groupedByUptdId).map(([uptdId, data]) => ({
          uptdId,
          totalPermintaan: data.totalPermintaan,
          uptdNama: data.uptdNama,
        }))
      );
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  getAllStatistik: async (req, res) => {
    const { id } = req.query;
    try {
      const result = await obat.findAll({
        where: {
          kategoriId: 1,
        },
        limit: 10,

        include: [
          {
            model: noBatch,
            include: [
              {
                model: amprahanItem,
                include: [
                  {
                    model: amprahan,
                    include: [
                      {
                        model: uptd,
                        where: {
                          statusTujuanId: 1,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      return res.status(200).send({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
