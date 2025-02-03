const { db, dbquery } = require("../database");
const {
  satuan,
  sequelize,
  sumberDana,
  kelasterapi,
  kategori,
  uptd,
  perusahaan,
  aplikasi,
} = require("../models");
const { Op } = require("sequelize");
module.exports = {
  getAllSeeders: async (req, res) => {
    try {
      const satuanSeed = await satuan.findAll();
      const kategoriSeed = await kategori.findAll();
      const kelasterapiSeed = await kelasterapi.findAll();
      const sumberDanaSeed = await sumberDana.findAll();
      const aplikasiSeed = await aplikasi.findAll();
      const uptdSeed = await uptd.findAll({
        where: {
          statusTujuanId: 1,
        },
      });
      const perusahaanSeed = await perusahaan.findAll({
        where: {
          id: {
            [Op.gt]: 1,
          },
        },
      });

      return res.status(200).send({
        satuanSeed,
        kategoriSeed,
        sumberDanaSeed,
        kelasterapiSeed,
        uptdSeed,
        perusahaanSeed,
        aplikasiSeed,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  postSatuan: async (req, res) => {
    // console.log(req.query);
    try {
      const newSatuan = await satuan.create({
        nama: req.query.nama,
      });
      return res.status(200).send({
        newSatuan,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postAplikasi: async (req, res) => {
    // console.log(req.body);
    const { nama, warna } = req.body;
    try {
      const newAplikasi = await aplikasi.create({
        nama,
        warna,
      });
      return res.status(200).send({
        newAplikasi,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postKategori: async (req, res) => {
    try {
      const newKategori = await kategori.create({
        nama: req.query.nama,
      });
      return res.status(200).send({
        newKategori,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postKelasTerapi: async (req, res) => {
    // console.log(req.query, "KELASTERAPI");
    try {
      const newKelasTerapi = await kelasterapi.create({
        nama: req.query.nama,
      });
      return res.status(200).send({
        newKelasTerapi,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postSumberDana: async (req, res) => {
    // console.log(req.query, "Sumber DANA");
    try {
      const newSumberDana = await sumberDana.create({
        sumber: req.query.sumber,
      });
      return res.status(200).send({
        newSumberDana,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  postTujuan: async (req, res) => {
    // console.log(req.query, "TUJUANNNN");
    try {
      const newTujuan = await uptd.create({
        nama: req.query.nama,
        statusTujuanId: 1,
      });
      return res.status(200).send({
        newTujuan,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  deleteSatuan: async (req, res) => {
    try {
      await satuan({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({ message: "satuan berhasil dihapus" });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  deleteKategori: async (req, res) => {
    try {
      await kategori({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({ message: "kategori berhasil dihapus" });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  deleteKelasTerapi: async (req, res) => {
    try {
      await kelasterapi({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({ message: "kelas terapi berhasil dihapus" });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
