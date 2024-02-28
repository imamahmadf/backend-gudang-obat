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
  postAmprahan: async (req, res) => {
    try {
      const { puskesmasId, tanggal } = req.query;
      console.log(req.query);
      const result = await amprahan.create({
        uptdId: puskesmasId,
        tanggal,
        status: 1,
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
  postAmprahanItem: async (req, res) => {
    try {
      const { noBatchId, userId, amprahanId, permintaan, stokAwal, obatId } =
        req.query;

      const ubahStok = await noBatch.update(
        {
          stok: stokAwal - permintaan,
        },
        {
          where: {
            id: noBatchId,
          },
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
        }
      );
      const getTambahStok = await obat.findOne({
        where: {
          id: parseInt(obatId),
        },
      });
      const result = await amprahanItem.create({
        noBatchId,
        userId,
        amprahanId,
        permintaan,
        sisa: getTambahStok.totalStok,
      });

      return res.status(200).json({
        message: "berhasi menambahkan amprahan item",
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getAmprahan: async (req, res) => {
    try {
      const result = await amprahan.findAll({
        where: {
          status: 1,
        },
        include: [
          {
            model: uptd,
          },
        ],
        where: {
          status: 1,
        },
        required: true,
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getAllAmprahan: async (req, res) => {
    try {
      console.log("MASUK AMPRAHAN");
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const filter = req.query.filter;
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
      const time = req.query.time || "ASC";
      const offset = limit * page;
      const whereCondition = {};
      if (req.query?.startDate) {
        whereCondition.startDate = {
          [Op.gt]: startDate,
        };
      }

      if (req.query?.endDate) {
        whereCondition.endDate = {
          [Op.lt]: endDate,
        };
      }

      const result = await amprahan.findAndCountAll({
        include: [
          {
            model: uptd,
            // where: {
            //   status: 1,
            // },
          },
        ],
        offset,
        limit,
        where: {
          status: 1,
        },
      });
      const totalRows = result.count;
      const totalPage = Math.ceil(totalRows / limit);
      res.status(200).json({
        result,
        page,
        limit,
        totalRows,
        totalPage,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getDetailAmprahan: async (req, res) => {
    const id = req.params.amprahanId;
    try {
      const result = await amprahan.findOne({
        where: {
          id,
        },
        include: [
          {
            model: amprahanItem,
            include: [
              {
                model: noBatch,
                include: [
                  {
                    model: obat,
                    include: [
                      {
                        model: satuan,
                      },
                    ],
                  },
                ],
              },
            ],
            // where: {
            //   userId: 2,
            // },
          },
          {
            model: uptd,
          },
        ],
      });
      res.status(200).json({
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
