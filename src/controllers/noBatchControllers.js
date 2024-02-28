const { db, dbquery } = require("../database");
const {
  noBatch,
  sequelize,
  amprahanItem,
  amprahan,
  obat,
} = require("../models");

module.exports = {
  postNoBatch: async (req, res) => {
    try {
      const { noBatch2, exp, stok, harga, obatId, perusahaanId } = req.query;
      console.log(req.query, "tess");

      const newNoBatch = await noBatch.create({
        noBatch: noBatch2,
        exp,
        obatId: parseInt(obatId),
        harga: parseInt(harga),
        stok: parseInt(stok),
      });

      const tambahStok = await obat.update(
        {
          // totalStok: 6645,
          totalStok: sequelize.literal(`totalStok + ${parseInt(stok)}`),
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

      const currentDate = new Date();
      const tambahObat = await amprahan.create({
        status: 5,
        tanggal: currentDate,
        uptdId: parseInt(perusahaanId),
      });

      const tambahAmprahaanItem = await amprahanItem.create({
        noBatchId: newNoBatch.id,
        userId: parseInt(1),
        amprahanId: tambahObat.id,
        permintaan: parseInt(stok),
        sisa: getTambahStok.totalStok,
      });
      console.log(getTambahStok);
      return res.status(200).json({
        message: "berhasi tambah data",
        getTambahStok,
        tambahAmprahaanItem,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
