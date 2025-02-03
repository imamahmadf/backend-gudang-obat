const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  StatusAmprahan,
  sequelize,
  sumberDana,
  kategori,
  kelasterapi,
} = require("../models");

const { Op } = require("sequelize");

module.exports = {
  getAll: async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
      const obatId = req.params.obatId;
      // console.log(obatId, "ADMIN");
      const result = await amprahanItem.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: noBatch,
            required: true,
            paranoid: false,

            include: [
              {
                model: obat,
                required: true,
                where: {
                  id: obatId,
                },
              },
            ],
          },
          {
            model: amprahan,
            include: [{ model: uptd }, { model: StatusAmprahan }],
            where: {
              statusAmprahanId: {
                [Op.between]: [1, 7],
              },
              isOpen: 0,
            },
          },
        ],
        limit: 30,
        transaction,
      });
      const resultObat = await obat.findOne({
        where: {
          id: obatId,
        },
        include: [
          {
            model: noBatch,
            required: true,
            where: {
              status: 1,
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
            model: sumberDana,
            attributes: ["sumber"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
        ],
        transaction,
      });

      await transaction.commit();
      return res.status(200).json({ result, resultObat });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res.status(500).json({
        message: err,
      });
    }
  },
  editAmprahanItem: async (req, res) => {
    const { id, sisa, permintaan } = req.body;
    // console.log(req.body, "INI data dari admin fornt end");
    try {
      await amprahanItem.update(
        {
          permintaan,
          sisa,
        },
        { where: { id } }
      );
      res.status(200).send({
        message: "berhasil edit amprahan item",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  getObat: async (req, res) => {
    try {
      const { obatId } = req.params;

      const result = await obat.findOne({
        where: {
          id: obatId,
        },
        include: [
          {
            model: noBatch,
            required: true,
            where: {
              status: 1,
            },
          },
        ],
      });
      res.status(200).send({
        result,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  deleteAmprahanItem: async (req, res) => {
    const id = req.body.id;
    // console.log(id);
    try {
      amprahanItem.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "berhasil hapus data amrpahan item!",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  editNoBatch: async (req, res) => {
    const { stok, id } = req.body;
    // console.log(id, stok);
    try {
      const result = await noBatch.update(
        {
          stok,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({ result });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  editTotalStok: async (req, res) => {
    const { totalStok, id } = req.body;
    // console.log(req.body);
    try {
      const result = await obat.update(
        { totalStok },
        {
          where: {
            id,
          },
        }
      );
      return res
        .status(200)
        .json({ result, message: "Berhasil Update data total stok" });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
