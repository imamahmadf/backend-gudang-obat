const { db, dbquery } = require("../database");
const {
  noBatch,
  sequelize,
  amprahanItem,
  amprahan,
  obat,
} = require("../models");
const fs = require("fs");
module.exports = {
  postNoBatch: async (req, res) => {
    try {
      const {
        noBatch2,
        exp,
        stok,
        harga,
        obatId,
        perusahaan,
        kotak,
        sumberDana,
      } = req.body;
      console.log(req.body);
      const filePath = "noBatch";

      let picFE = null;
      if (req.file) {
        console.log("GGGGGGGGGGGGGGGGGGGGGGGGGG");
        const { filename } = req.file;
        picFE = `/${filePath}/${filename}`;
      }

      const newNoBatch = await noBatch.create({
        noBatch: noBatch2,
        exp,
        obatId: parseInt(obatId),
        harga: parseInt(harga),
        stok: parseInt(stok),
        status: 0,
        perusahaanId: parseInt(perusahaan),
        pic: picFE,
        kotak: parseInt(kotak),
        sumberDanaId: parseInt(sumberDana),
      });

      return res.status(200).json({
        message: "berhasi tambah data",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  tolak: async (req, res) => {
    const { id } = req.body;
    console.log(req.body, "DDDDDDDD");
    try {
      const result = await noBatch.update(
        {
          status: 2,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        message: "tolak no batch",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  terima: async (req, res) => {
    const transaction = await sequelize.transaction();
    console.log(req.body, "Data diterima:");
    const { exp, stok, obatId, noBatchId, perusahaanId, totalStok } = req.body;
    try {
      console.log(req.query);
      const terima = await noBatch.update(
        {
          status: 1,
        },
        {
          where: {
            id: noBatchId,
          },
          transaction,
        }
      );
      const tambahStok = await obat.update(
        {
          totalStok,
        },
        {
          where: {
            id: parseInt(obatId),
          },
          transaction,
        }
      );
      const currentDate = new Date();
      const tambahObat = await amprahan.create(
        {
          StatusAmprahanId: 5,
          tanggal: currentDate,
          uptdId: parseInt(perusahaanId),
          isOpen: 0,
        },
        { transaction }
      );

      const tambahAmprahaanItem = await amprahanItem.create(
        {
          noBatchId,
          userId: parseInt(1),
          amprahanId: tambahObat.id,
          permintaan: parseInt(stok),
          sisa: totalStok,
        },
        { transaction }
      );

      await transaction.commit();
      return res.status(200).json({
        message: "berhasil tambah data",
        tambahAmprahaanItem,
      });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  // terima: async (req, res) => {
  //   const transaction = await sequelize.transaction();
  //   console.log(req.body, "Data diterima:");
  //   const { noBatch, exp, stok, obatId, noBatchId, perusahaanId, totalStok } =
  //     req.body;
  //   try {
  //     const newNoBatch = await noBatch.create(
  //       {
  //         noBatch,
  //         exp,
  //         obatId: parseInt(obatId),
  //         harga: parseInt(harga),
  //         stok: parseInt(stok),
  //         status: 0,
  //         perusahaanId: parseInt(perusahaanId),
  //       },
  //       { transaction }
  //     );

  //     const tambahStok = await obat.update(
  //       {
  //         totalStok: sequelize.literal(`totalStok + ${parseInt(stok)}`),
  //       },
  //       {
  //         where: {
  //           id: parseInt(obatId),
  //         },
  //         transaction,
  //       }
  //     );

  //     const getTambahStok = await obat.findOne({
  //       where: {
  //         id: parseInt(obatId),
  //       },
  //       transaction,
  //     });

  //     const currentDate = new Date();
  //     const tambahObat = await amprahan.create(
  //       {
  //         status: 5,
  //         tanggal: currentDate,
  //         uptdId: parseInt(perusahaanId),
  //       },
  //       { transaction }
  //     );

  //     const tambahAmprahaanItem = await amprahanItem.create(
  //       {
  //         noBatchId,
  //         userId: parseInt(1),
  //         amprahanId: tambahObat.id,
  //         permintaan: parseInt(stok),
  //         sisa: getTambahStok.totalStok,
  //       },
  //       { transaction }
  //     );

  //     await transaction.commit();

  //     return res.status(200).json({
  //       message: "berhasi tambah data",
  //     });
  //   } catch (err) {
  //     await transaction.rollback();
  //     console.log(err);
  //     return res.status(500).json({
  //       message: err,
  //     });
  //   }
  // },

  editNobatch: async (req, res) => {
    console.log(req.body);
    console.log(req.file?.filename, "NAMA FOTO DISINI!!!!!!!!!!!!!!!!!!!!!!!!");

    const { noBatchFE, exp } = req.body;
    const harga = parseInt(req.body.harga);
    const id = parseInt(req.body.id);
    const kotak = parseInt(req.body.kotak);
    const filePath = "nobatch";
    const transaction = await sequelize.transaction();
    try {
      const old_img = await noBatch.findOne(
        {
          where: { id },
        },
        { transaction }
      );

      if (req.file?.filename) {
        console.log("ADA FILE YANG DIKIRIM LOHHHHHHHHHH!!!!!!!!!!!");
        const { filename } = req.file;
        if (old_img.pic != null) {
          const path = `${__dirname}/../public${old_img.pic}`;
          fs.unlink(path, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        const updateNoBatch = await noBatch.update(
          {
            noBatch: noBatchFE,
            exp,
            harga,
            kotak,
            pic: `/${filePath}/${filename}`,
          },
          { where: { id }, transaction }
        );
      } else {
        const updateNoBatch = await noBatch.update(
          {
            noBatch: noBatchFE,
            exp,
            harga,
            kotak,
          },
          { where: { id }, transaction }
        );
      }
      await transaction.commit();
      return res.status(200).json({
        message: "success ubah data",
      });
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
