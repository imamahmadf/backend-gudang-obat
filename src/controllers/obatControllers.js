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
  // puskesmas,
} = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
  addObat: async (req, res) => {
    try {
      const { nama, kelasTerapiId, pic, satuanId, profileId, kategoriId } =
        req.body;
      console.log(req.file.filename, "filenama tes123");
      const filePath = "obat";
      const { filename } = req.file;
      const newObat = await obat.create({
        nama,
        pic: `/${filePath}/${filename}`,
        kelasTerapiId,

        satuanId,
        profileId,
        kategoriId,
        totalStok: 0,
      });

      return res.status(200).json({
        message: "success add data",
        results: newObat,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getAllObat: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const alfabet = req.query.alfabet || "ASC";
    const time = req.query.time || "ASC";
    const offset = limit * page;
    console.log(req.query);
    try {
      const result = await obat.findAndCountAll({
        where: { nama: { [Op.like]: "%" + search + "%" } },
        attributes: ["nama", "pic", "id"],
        order: [
          // ["updatedAt", `${time}`],
          ["nama", `${alfabet}`],
        ],
        offset: offset,
        limit: limit,
        include: [
          {
            model: kategori,
            attributes: ["nama"],
          },
          {
            model: kelasterapi,
            attributes: ["nama"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          {
            model: noBatch,
            attributes: ["noBatch", "exp", "harga", "stok", "id"],
            required: true,
          },
        ],
      });
      const totalRows = result.count;
      const totalPage = Math.ceil(totalRows / limit);

      const perhitungan = await obat.findAll({
        include: [
          {
            model: noBatch,
            required: true,
          },
        ],
      });

      var jumlah = 0;
      var totalAset = 0;
      perhitungan.map((val, idx) => {
        val.noBatches.map((val2, idx2) => {
          jumlah = jumlah + val2.stok * val2.harga;
        });
        totalAset += jumlah;
        jumlah = 0;
      });

      res.status(200).send({
        result,
        page,
        limit,
        totalRows,
        totalPage,
        totalAset,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        massage: err,
      });
    }
  },
  getNamaObat: async (req, res) => {
    try {
      const result = await obat.findAll({
        order: [["nama", "ASC"]],
      });

      const seederSatuan = await satuan.findAll({
        order: [["nama", "ASC"]],
      });

      const seederKelasTerapi = await kelasterapi.findAll({
        order: [["nama", "ASC"]],
      });
      const seederKategori = await kategori.findAll({
        order: [["nama", "ASC"]],
      });

      const profileStaff = await profile.findAll({
        attributes: ["nama", "id"],
        order: [["nama", "ASC"]],
      });
      res.status(200).send({
        result,
        seederSatuan,
        seederKategori,
        seederKelasTerapi,
        profileStaff,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        massage: err,
      });
    }
  },

  deletObat: async (req, res) => {
    const { id, old_img } = req.body;
    console.log(id, old_img, "INI DETELTE");
    await obat.destroy({
      include: [
        {
          model: noBatch,
        },
      ],
      where: {
        id,
      },
    });

    const path = `${__dirname}/../public${old_img}`;
    console.log(path);
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return res.send("obat telah dihapus");
  },

  getOneObat: async (req, res) => {
    const id = req.params.obatId;

    try {
      const result = await obat.findOne({
        where: {
          id,
        },
        include: [
          {
            model: kategori,
            attributes: ["nama"],
          },
          {
            model: kelasterapi,
            attributes: ["nama"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          {
            model: noBatch,
            attributes: ["noBatch", "exp", "harga", "stok"],
            required: true,
          },
        ],
      });
      return res.send(result);
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getDetailObat: async (req, res) => {
    const id = req.params.obatId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const time = req.query.time || "ASC";
    const puskesmasId = parseInt(req.query.puskesmasId);
    const offset = limit * page;
    console.log(
      page,
      limit,
      id,
      startDate,
      endDate,
      time,
      puskesmasId,
      "CEK DISINI WOI"
    );
    const whereCondition = {};

    const whereConditionPKM = {};

    if (puskesmasId) {
      whereConditionPKM.id = puskesmasId; // Menggunakan langsung nilai ID tanpa perlu menempatkannya dalam properti 'puskesmasId'
    }
    if (req.query?.startDate) {
      whereCondition.tanggal = {
        [Op.lt]: endDate,
      };
    }

    if (req.query?.endDate) {
      whereCondition.tanggal = {
        [Op.lt]: endDate,
      };
    }
    try {
      const result = await obat.findOne({
        where: {
          id,
        },
        include: [
          {
            model: kategori,
            attributes: ["nama"],
          },
          {
            model: kelasterapi,
            attributes: ["nama"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          {
            model: noBatch,
            attributes: ["noBatch", "exp", "harga", "stok"],
            required: true,
          },
        ],
      });
      const amprahanData = await amprahanItem.findAndCountAll({
        include: [
          {
            model: noBatch,
            attributes: ["stok", "exp", "noBatch"],
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
          {
            model: amprahan,

            include: [
              {
                model: uptd,

                where: whereConditionPKM,
              },
            ],
            attributes: ["status", "tanggal"],
            where: whereCondition,
          },
        ],
        offset: offset,
        limit: limit,
        attributes: ["permintaan", "sisa"],

        order: [[{ model: amprahan }, "tanggal", time]],
      });

      const totalRows = amprahanData.count;
      const totalPage = Math.ceil(totalRows / limit);
      res.status(200).send({
        result,
        amprahanData,
        page,
        limit,
        totalRows,
        totalPage,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
