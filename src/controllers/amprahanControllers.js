const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
  StatusAmprahan,
  alokasi,
} = require("../models");

const { Op } = require("sequelize");

module.exports = {
  postAmprahan: async (req, res) => {
    try {
      const { puskesmasId, statusId } = req.query;

      // console.log(req.query);
      const result = await amprahan.create({
        uptdId: puskesmasId,
        tanggal: new Date(),
        StatusAmprahanId: statusId,
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
    // console.log(req.query, "CEK DATA UNTUK ALOKASI DAN AMPRAHAN");
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
          StatusAmprahanId: {
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
      // console.log(req.query, "MASUK AMPRAHAN");
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const filter = req.query.filter;
      const page = parseInt(req.query.page) || 0;
      const limit = parseInt(req.query.limit) || 5;
      const time = req.query.time || "ASC";
      const offset = limit * page;

      const statusAmprahanId = parseInt(req.query.jenis);

      const whereCondition = {};
      // console.log(statusAmprahanId, "STATUS AMPRAHAN");

      if (statusAmprahanId) {
        whereCondition.StatusAmprahanId = {
          [Op.eq]: statusAmprahanId,
        };
      }

      if (startDate && endDate) {
        whereCondition.tanggal = {
          [Op.between]: [startDate, endDate],
        };
      }

      const result = await amprahan.findAndCountAll({
        include: [
          {
            model: uptd,
          },
          {
            model: StatusAmprahan,
          },
        ],

        offset,

        limit,
        where: whereCondition,
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
    // console.log(penanggungjawab);
    if (penanggungjawab) {
      // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
                required: true,
                paranoid: false,
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
          statusAmprahanId: {
            [Op.between]: [1, 7],
          },
          isOpen: 1,
        },
        include: [
          {
            model: uptd,
            required: true, // Pastikan required berada di dalam include
            attributes: ["nama"],
          },
          {
            model: amprahanItem,
            limit: 2,
            order: [["id", "DESC"]],
            attributes: ["permintaan", "sisa", "id", "NoBatchId"],
            include: [
              {
                model: noBatch,
                attributes: ["noBatch", "exp", "pic", "kotak", "id", "stok"],
                include: [
                  { model: obat, attributes: ["nama", "id", "totalStok"] },
                ],
              },
            ],
          },
          { model: StatusAmprahan, attributes: ["nama"] },
          { model: alokasi, attributes: ["nama"] },
        ],
        attributes: ["alokasiId", "tanggal", "isOpen", "StatusAmprahanId"],
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
    // console.log(req.params.id, "TUTOPPPPPPPPPP");
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
    // console.log(req.body);
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
    const { obatId, stokEXP, perusahaanId, noBatchId, userId } = req.body;
    const expId = 25;
    const transaction = await sequelize.transaction();
    // console.log(req.body, "KADALUWARSAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
