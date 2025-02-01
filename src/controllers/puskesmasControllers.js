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
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getPuskesmas: async (req, res) => {
    const { puskesmasId } = req.params;

    // Validasi puskesmasId
    if (isNaN(puskesmasId)) {
      return res
        .status(400)
        .json({ message: "puskesmasId harus berupa angka." });
    }

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const kelasTerapiId = parseInt(req.query.kelasTerapiId) || null; // Handle kemungkinan null
    const kategoriId = parseInt(req.query.kategoriId) || null; // Handle kemungkinan null
    const satuanId = parseInt(req.query.satuanId) || null; // Handle kemungkinan null
    const offset = limit * page;
    const profileId = parseInt(req.query.profileId);

    let transaction;
    try {
      transaction = await sequelize.transaction();

      const whereObat = {
        nama: { [Op.like]: `%${search}%` },
      };

      // Kondisi where untuk obat hanya jika parameter ada
      if (kelasTerapiId) whereObat.kelasTerapiId = kelasTerapiId;
      if (kategoriId) whereObat.kategoriId = kategoriId;
      if (satuanId) whereObat.satuanId = satuanId;
      if (profileId) whereObat.profileId = profileId;

      const whereAmprahan = {
        uptdId: puskesmasId,
        StatusAmprahanId: {
          [Op.between]: [1, 4],
        },
      };
      if (startDate && endDate) {
        whereAmprahan.tanggal = {
          [Op.between]: [startDate, endDate],
        };
      }
      const result = await amprahanItem.findAll({
        include: [
          {
            model: amprahan,
            where: whereAmprahan,
            attributes: ["StatusAmprahanId", "tanggal"],
            include: [{ model: StatusAmprahan, attributes: ["nama"] }],
          },
          {
            model: noBatch,
            attributes: ["noBatch", "exp", "harga", "stok"],
            include: [
              {
                model: obat,
                where: whereObat,
                attributes: ["nama", "totalStok"],
              },
            ],
          },
        ],
        offset, // Tambahkan offset
        limit, // Tambahkan limit
        order: [[{ model: noBatch }, { model: obat }, "id", "ASC"]],
        attributes: ["permintaan", "sisa"],
        transaction,
      });

      if (!result || result.length === 0) {
        return res.status(200).json({
          result: [],
          page,
          limit,
          totalRows: 0,
          totalPage: 0,
          message: "Data tidak ditemukan",
        });
      }

      console.log(
        "Data mentah dari database:",
        JSON.stringify(result, null, 2)
      );

      const resultJSON = result.map((item) => ({
        ...item.toJSON(),
        amprahan: item.amprahan ? item.amprahan.toJSON() : null,
        noBatch: item.noBatch
          ? {
              ...item.noBatch.toJSON(),
              obat: item.noBatch.obat ? item.noBatch.obat.toJSON() : null,
            }
          : null,
      }));

      const groupedResult = resultJSON.reduce((acc, item) => {
        const namaObat = item.noBatch?.obat?.nama; // Optional chaining untuk mencegah error
        const statusAmprahanId = item.amprahan?.StatusAmprahanId; // Optional chaining

        if (!namaObat || !statusAmprahanId) {
          console.warn("Data tidak lengkap:", item); // Log jika ada data yang tidak lengkap
          return acc; // Lewati item ini
        }

        let existingGroup = acc.find(
          (g) => g.nama === namaObat && g.statusAmprahanId === statusAmprahanId
        );

        if (existingGroup) {
          existingGroup.items.push(item);
        } else {
          acc.push({
            nama: namaObat,
            statusAmprahanId: statusAmprahanId,
            items: [item],
          });
        }
        return acc;
      }, []);

      const totalRows = await amprahanItem.count({
        include: [
          { model: amprahan, where: whereAmprahan },
          {
            model: noBatch,
            include: [{ model: obat, where: whereObat }],
          },
        ],
        transaction,
      });

      const totalPage = Math.ceil(totalRows / limit);

      await transaction.commit();

      res.status(200).json({
        result: groupedResult,
        page,
        limit,
        totalRows,
        totalPage,
      });
    } catch (error) {
      if (transaction) await transaction.rollback(); // Rollback transaksi jika ada error
      console.error("Error in getPuskesmas:", error);
      res.status(500).json({
        message: error.message || "Terjadi kesalahan server.",
        pesan: "Terjadi kesalahan saat memproses permintaan.",
      });
    }
  },
};
