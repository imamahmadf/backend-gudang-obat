const { db, dbquery } = require("../database");
const { uptd, amprahan, amprahanItem, noBatch } = require("../models");

module.exports = {
  getOnePuskesmas: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await uptd.findOne({
        where: {
          id,
        },
        include: [
          {
            model: amprahan,
            include: [
              {
                model: amprahanItem,
                include: [
                  {
                    model: noBatch,
                  },
                ],
              },
            ],
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
  getPerusahaan: async (req, res) => {
    try {
      const result = await uptd.findAll({
        where: {
          status: 2,
        },
      });
      return res.send(result);
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  addPerusahaan: async (req, res) => {
    const { nama, alamat } = req.query;
    try {
      const newPerusahaan = await uptd.create({
        nama,
        status: 2,
      });
      return res.status(200).json({
        message: "success add data",
        result: newPerusahaan,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  getAllPuskesmas: async (req, res) => {
    try {
      const result = await uptd.findAll({
        where: {
          status: 1,
        },
        attributes: ["nama", "id"],
        order: [["nama", "ASC"]],
      });
      return res.status(200).send({
        result,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
