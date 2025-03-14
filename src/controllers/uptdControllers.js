const { db, dbquery } = require("../database");
const {
  uptd,
  amprahan,
  amprahanItem,
  noBatch,
  perusahaan,
  sequelize,
} = require("../models");

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
          statusTujuanId: 2,
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
    const transaction = await sequelize.transaction();
    const { nama, alamat } = req.query;
    // console.log(req.query, "cek perusahaan");
    try {
      const newPerusahaan = await uptd.create(
        {
          nama,
          statusTujuanId: 2,
        },
        transaction
      );

      const newPerusahaanTable = await perusahaan.create(
        {
          id: newPerusahaan.id,
          nama,
        },
        transaction
      );

      await transaction.commit();
      return res.status(200).json({
        message: "success add data",
        // result: newPerusahaan,
      });
    } catch (err) {
      await transaction.rollback();

      console.log(err);
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
          statusTujuanId: 1,
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
