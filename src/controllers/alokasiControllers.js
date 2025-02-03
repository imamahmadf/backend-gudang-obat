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
  kategori,
  aplikasi,
  sumberDana,
  kelasterapi,
} = require("../models");
const { Op, where } = require("sequelize");

module.exports = {
  getAllAlokasi: async (req, res) => {
    try {
      const result = await alokasi.findAll({
        include: [
          {
            model: amprahan,
            include: [
              {
                model: uptd,
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

  getAlokasi: async (req, res) => {
    const id = parseInt(req.params.obatId);
    try {
      const result = await alokasi.findAll({
        include: [
          {
            model: amprahan,
            include: [
              {
                model: uptd,
                attributes: ["nama"],
              },
              {
                model: amprahanItem,
                attributes: ["permintaan", "sisa"],

                include: [
                  {
                    model: noBatch,
                    attributes: ["id", "noBatch"],
                    required: true,
                    include: [
                      {
                        model: obat,
                        where: {
                          id,
                        },

                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
            where: {
              isOpen: 1,
            },
            required: true,
          },
        ],
      });
      const getObat = await obat.findAll({
        where: id,
        include: [
          {
            model: noBatch,
            where: {
              status: 1,
              stok: {
                [Op.gt]: 0,
              },
            },
          },
          {
            model: kategori,
            attributes: ["nama"],
          },
          {
            model: kelasterapi,
            attributes: ["nama"],
          },
          {
            model: aplikasi,
            attributes: ["nama", "warna"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          { model: sumberDana },
        ],
      });

      return res.status(200).send({ result, getObat });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  postAlokasi: async (req, res) => {
    const transaction = await sequelize.transaction();
    const tujuanId = req.body.tujuanId;
    const judulAlokasi = req.body.judul;
    // console.log(req.body, "ALOKASI");
    try {
      const newAlokasi = await alokasi.create(
        {
          nama: judulAlokasi,
        },
        { transaction }
      );

      const dataNewAmprahan = tujuanId.map((item) => ({
        StatusAmprahanId: 4,
        alokasiId: newAlokasi.id,
        tanggal: new Date(),
        uptdId: item,
        isOpen: 1,
      }));
      const newAmprahan = await amprahan.bulkCreate(dataNewAmprahan, {
        transaction,
      });

      await transaction.commit();

      return res.status(200).json({
        message: "berhasi menambahkan alokasi",
      });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  postItemAlokasi: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { noBatchId, userId, amprahanId, permintaan, stokAwal, obatId } =
        req.body;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  tutupAlokasi: async (req, res) => {
    try {
      const { dataId } = req.body;
      await amprahan.update(
        { isOpen: 0 },
        {
          where: {
            id: dataId,
          },
        }
      );
      return res.status(200).json({
        message: "Berhasil menutup alokasi",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getDetailAlokasi: async (req, res) => {
    const id = req.params.alokasiId;
    try {
      // console.log(req.params.alokasiId, "ALOKASI IO DARI FRONTEND");
      const result = await alokasi.findOne({
        where: {
          id,
        },
        include: [
          {
            model: amprahan,
            required: true,
            include: [
              {
                model: uptd,
                attributes: ["nama"],
              },
              {
                model: amprahanItem,
                attributes: ["permintaan", "sisa"],
                required: true,

                include: [
                  {
                    model: noBatch,
                    attributes: ["id", "noBatch"],
                    required: true,
                    include: [
                      {
                        model: obat,

                        required: true,
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
