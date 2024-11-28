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

const { Op } = require("sequelize");

module.exports = {
  postAmprahan: async (req, res) => {
    try {
      const { puskesmasId, statusId } = req.query;

      console.log(req.query);
      const result = await amprahan.create({
        uptdId: puskesmasId,
        tanggal: new Date(),
        status: statusId,
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
  postAmprahanItem: async (req, res) => {
    const transaction = await sequelize.transaction();
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
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(200).json({
        message: "berhasi menambahkan amprahan item",
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

  getAmprahan: async (req, res) => {
    try {
      const result = await amprahan.findAll({
        where: {
          status: {
            [Op.between]: [1, 5],
          },
        },
        include: [
          {
            model: uptd,
            required: true, // Pastikan required berada di dalam include
          },
        ],
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    }
  },

  getAllAmprahan: async (req, res) => {
    try {
      console.log(req.query, "MASUK AMPRAHAN");
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const filter = req.query.filter;
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
      const time = req.query.time || "ASC";
      const offset = limit * page;
      const whereCondition = {};
      const status = parseInt(req.query.jenis);
      console.log(status, "STATUS AMPRAHAN");
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
          },
        ],

        offset,

        limit,
        where: {
          status,
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
    const penanggungjawab = parseInt(req.query.penanggungjawab);
    const whereCondition = {};
    console.log(penanggungjawab);
    if (penanggungjawab) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      whereCondition.profileId = penanggungjawab;
    }
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
                    where: whereCondition,
                    include: [
                      {
                        model: satuan,
                      },
                    ],
                  },
                ],
                required: true,
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
  statusAmprahan: async (req, res) => {
    try {
      const result = await amprahan.findAll({
        where: {
          status: {
            [Op.between]: [1, 5],
          },
          isOpen: 1,
        },
        include: [
          {
            model: uptd,
            required: true, // Pastikan required berada di dalam include
          },
        ],
      });
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message || "Internal Server Error",
      });
    }
  },

  tutupAmprahan: async (req, res) => {
    console.log(req.params.id, "TUTOPPPPPPPPPP");
    const id = req.params.id;
    try {
      const result = await amprahan.update({ isOpen: 0 }, { where: { id } });
      return res.status(200).send(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  ubahPermintaan: async (req, res) => {
    const {
      id,
      permintaan,
      permintaanBaru,
      sisa,
      obatId,
      totalStok,
      stok,
      noBatchId,
    } = req.body;
    console.log(req.body);
    const transaction = await sequelize.transaction();
    try {
      const editPermintaan = await amprahanItem.update(
        {
          permintaan: permintaanBaru,
          sisa: sisa + permintaan - permintaanBaru,
        },
        {
          where: { id },
        },
        transaction
      );

      const editTotalStok = await obat.update(
        {
          totalStok: totalStok + permintaan - permintaanBaru,
        },
        {
          where: {
            id: obatId,
          },
        },
        transaction
      );

      const ubahStok = await noBatch.update(
        {
          stok: stok + permintaan - permintaanBaru,
        },
        {
          where: {
            id: noBatchId,
          },
        }
      );

      await transaction.commit();
      return res.status(200).json({
        message: "Berhasil ubah permintaan",
      });
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  deleteAmprahanItem: async (req, res) => {
    const { id, permintaan, sisa, obatId, totalStok, stok, noBatchId } =
      req.body;
    const transaction = await sequelize.transaction();
    try {
      const deletePermintaan = await amprahanItem.destroy(
        {
          where: {
            id,
          },
        },
        transaction
      );
      const editTotalStok = await obat.update(
        {
          totalStok: totalStok + permintaan,
        },
        {
          where: {
            id: obatId,
          },
        },
        transaction
      );

      const ubahStok = await noBatch.update(
        {
          stok: stok + permintaan,
        },
        {
          where: {
            id: noBatchId,
          },
        }
      );

      await transaction.commit();
      return res.status(200).json({
        message: "data berhasil dihapus",
      });
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  kadaluwarsa: async (req, res) => {
    const { obatId, stok, perusahaanId, noBatchId, userId } = req.body;
    const transaction = await sequelize.transaction();
    const tanggal = new Date();
    try {
      const buatAmprahan = await amprahan.create(
        {
          uptdId: perusahaanId,
          tanggal,
          status: 6,
          isOpen: 0,
        },
        transaction
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
          totalStok: sequelize.literal(`totalStok - ${parseInt(stok)}`),
        },
        {
          where: {
            id: parseInt(noBatchId),
          },
          transaction,
        }
      );

      const getTambahStok = await obat.findOne({
        where: {
          id: parseInt(obatId),
        }.transaction,
      });
      const result = await amprahanItem.create(
        {
          noBatchId,
          userId,
          amprahanId: buatAmprahan.id,
          permintaan: stok,
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
