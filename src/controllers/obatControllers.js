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
  perusahaan,
  sequelize,
  user,
  userRole,
  role,
  StatusAmprahan,
  sumberDana,
  riwayat,
  aplikasi,
  // puskesmas,
} = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
  addObat: async (req, res) => {
    const transaction = await sequelize.transaction();
    const currentDate = new Date();
    try {
      const nama = req.query.nama;
      const kelasTerapiId = parseInt(req.query.kelasTerapiId);
      const satuanId = parseInt(req.query.satuanId);
      const profileId = parseInt(req.query.profileId);
      const kategoriId = parseInt(req.query.kategoriId);
      const sumberDanaId = parseInt(req.query.sumberDanaId);
      const profileReudxId = parseInt(req.query.profileReduxId);
      // console.log(req.file.filename, "filenama tes123");
      console.log(req.query, "TES OBAT");

      const newObat = await obat.create(
        {
          nama: nama,
          kelasTerapiId,
          satuanId,
          profileId,
          kategoriId,
          sumberDanaId,
          totalStok: 0,
        },
        { transaction }
      );

      const SONoBatch = await noBatch.create(
        {
          noBatch: "SO",
          exp: currentDate,
          harga: 0,
          obatId: newObat.id,
          // sumberDanaId,
          stok: 0,
          status: 2,
          perusahaanId: 1,
          pic: null,
          kotak: 0,
        },
        { transaction }
      );
      console.log(newObat.id, "INI ID ONBATNYAAAAA");
      // const riwayatObat = await riwayat.create(
      //   {
      //     obatId: parseInt(newObat.id),
      //     userId: profileId,
      //     riwayat: `obat ${newObat.nama} berhasil dibuat oleh `,
      //   },
      //   { transaction }
      // );

      const riwayatObat = await riwayat.create(
        {
          obatId: newObat.id,
          profileId: profileReudxId,
          riwayat: "Obat Berhasil ditambahkan !",
        },
        { transaction }
      );
      await transaction.commit();
      return res.status(200).json({
        message: "success add data",
        results: newObat,
      });
    } catch (err) {
      await transaction.rollback();
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

    const kelasTerapiId = parseInt(req.query.kelasTerapiId);
    const kategoriId = parseInt(req.query.kategoriId);
    const satuanId = parseInt(req.query.satuanId);
    const aplikasiId = parseInt(req.query.aplikasiId);
    const offset = limit * page;
    console.log(req.query);

    const whereCondition = {
      nama: { [Op.like]: "%" + search + "%" },
    };

    if (kelasTerapiId) {
      whereCondition.kelasTerapiId = kelasTerapiId;
    }

    if (kategoriId) {
      whereCondition.kategoriId = kategoriId;
    }

    if (satuanId) {
      whereCondition.satuanId = satuanId;
    }

    if (aplikasiId) {
      whereCondition.aplikasiId = aplikasiId;
    }

    try {
      const result = await obat.findAndCountAll({
        where: whereCondition,
        attributes: ["nama", "id", "profileId"],
        order: [
          // ["updatedAt", `${time}`],
          ["nama", `${alfabet}`],
          [{ model: noBatch }, "exp", "ASC"],
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
            model: aplikasi,
            attributes: ["nama", "warna"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          { model: sumberDana },
          {
            model: noBatch,
            attributes: [
              "noBatch",
              "exp",
              "harga",
              "stok",
              "id",
              "kotak",
              "pic",
            ],
            where: {
              status: 1,
              stok: { [Op.gt]: 0 },
            },

            required: false,
          },
        ],
      });
      const totalRows = await obat.count({ where: whereCondition });
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
      const perhitunganItem = await obat.findAll({});

      res.status(200).send({
        result,
        page,
        limit,
        totalRows,
        totalPage,
        totalAset,
        totalItem: perhitunganItem.length,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        massage: err,
      });
    }
  },

  getObatMasuk: async (req, res) => {
    const search = req.query.search_query || "";
    const alfabet = req.query.alfabet || "ASC";
    try {
      const result = await obat.findAll({
        where: { nama: { [Op.like]: "%" + search + "%" } },
        attributes: ["nama", "id", "totalStok"],
        order: [
          // ["updatedAt", `${time}`],
          ["nama", `${alfabet}`],
        ],

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
            attributes: [
              "noBatch",
              "exp",
              "harga",
              "stok",
              "id",
              "perusahaanId",
              "pic",
            ],
            include: [
              {
                model: perusahaan,
              },
            ],
            where: {
              status: 0,
            },
            required: true,
          },
        ],
      });

      const resultStatus = await amprahan.findAll({
        where: {
          StatusAmprahanId: {
            [Op.between]: [1, 5],
          },
          isOpen: 1,
        },
        include: [
          {
            model: uptd,
            required: true, // Pastikan required berada di dalam include
          },
        ],
      });

      res.status(200).send({
        result,
        massage: "Berhasil Verifikasi Obat Masuk",
        resultStatus,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        massage: err,
      });
    }
  },
  getNamaObat: async (req, res) => {
    const profileId = req.query.profileId;

    console.log(profileId, "INI PROFILEID DRI FE");

    const whereCondition = {};
    if (parseInt(profileId) !== 0) {
      whereCondition.profileId = profileId;
    }
    const transaction = await sequelize.transaction();
    try {
      const result = await obat.findAll({
        order: [["nama", "ASC"]],
        include: [
          {
            model: kategori,
            attributes: ["id", "nama"],
          },
        ],
        where: whereCondition,
        transaction,
      });

      const seederSatuan = await satuan.findAll({
        order: [["nama", "ASC"]],
        transaction,
      });

      const seederKelasTerapi = await kelasterapi.findAll({
        order: [["nama", "ASC"]],
        transaction,
      });

      const seederKategori = await kategori.findAll({
        order: [["nama", "ASC"]],
        transaction,
      });

      const profileStaff = await profile.findAll({
        attributes: ["nama", "id"],
        order: [["nama", "ASC"]],
        include: [
          {
            model: user,
            attributes: ["id"],
            required: true,
            include: [
              {
                model: userRole,
                attributes: ["id"],
                where: { roleId: 3 },
                required: true,
                include: [
                  {
                    model: role,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],

        transaction,
      });

      const seedSumberDana = await sumberDana.findAll({ transaction });

      await transaction.commit();
      res.status(200).send({
        result,
        seederSatuan,
        seederKategori,
        seederKelasTerapi,
        seedSumberDana,
        profileStaff,
        // statusAmprahan,
      });
    } catch (err) {
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.log(err);
      return res.status(500).json({
        massage: err,
        pesan: "errror bos",
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
    const transaction = await sequelize.transaction();
    try {
      const result = await obat.findOne(
        {
          where: {
            id,
          },
          include: [
            {
              model: kategori,
              attributes: ["nama", "id"],
            },
            {
              model: kelasterapi,
              attributes: ["nama", "id"],
            },
            {
              model: satuan,
              attributes: ["nama", "id"],
            },
            {
              model: aplikasi,
              attributes: ["nama", "id"],
            },
            {
              model: noBatch,
              attributes: [
                "noBatch",
                "exp",
                "harga",
                "stok",
                "id",
                "pic",
                "kotak",
              ],
              required: true,
              where: {
                status: 1,
              },
            },
          ],
        },
        { transaction }
      );

      const getRiwayat = await riwayat.findAll(
        {
          where: {
            obatId: id,
          },
          include: [
            {
              model: profile,
              attributes: ["nama"],
            },
          ],
        },
        { transaction }
      );
      await transaction.commit();
      return res.status(200).send({ result, getRiwayat });
    } catch (err) {
      await transaction.rollback();
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
    const jenis = parseInt(req.query.jenis);
    const offset = limit * page;
    console.log(id, "CEK DISINI WOI");
    const whereCondition = {};

    const whereConditionPKM = {};

    const whereConditionJenis = {};

    if (puskesmasId) {
      whereConditionPKM.id = puskesmasId; // Menggunakan langsung nilai ID tanpa perlu menempatkannya dalam properti 'puskesmasId'
    }

    if (jenis) {
      whereConditionJenis.id = jenis;
    }
    if (startDate && endDate) {
      whereCondition.tanggal = {
        [Op.between]: [startDate, endDate],
      };
    }

    try {
      const result = await obat.findOne({
        where: {
          id,
        },
        order: [[{ model: noBatch }, "exp", "ASC"]],
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
            model: sumberDana,
            attributes: ["sumber"],
          },
          {
            model: satuan,
            attributes: ["nama"],
          },
          { model: profile },

          {
            model: noBatch,
            attributes: ["noBatch", "exp", "harga", "stok", "pic", "kotak"],
            required: false,
            include: [
              {
                model: perusahaan,
                attributes: ["nama"],
              },
            ],
            where: {
              status: 1,
            },
          },
        ],
      });
      const amprahanData = await amprahanItem.findAndCountAll({
        include: [
          {
            model: noBatch,
            attributes: ["stok", "exp", "noBatch", "harga"],
            required: true,
            paranoid: false,
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
              {
                model: StatusAmprahan,
                where: whereConditionJenis,
              },
            ],
            attributes: ["statusAmprahanId", "tanggal"],
            where: whereCondition,
          },
        ],
        offset: offset,
        limit: limit,
        attributes: ["permintaan", "sisa", "catatan"],
        order: [["updatedAt", time]],
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
  getKadaluwarsa: async (req, res) => {
    try {
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

      const result = await obat.findAll({
        include: [
          {
            model: noBatch,
            where: {
              status: 1,
              exp: {
                [Op.lt]: sixMonthsFromNow, // Filter untuk exp kurang dari 6 bulan dari hari ini
              },
            },
            include: [
              {
                model: perusahaan,
                attributes: ["nama"],
              },
            ],
          },
        ],
      });

      return res.status(200).send({ result });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  patchObat: async (req, res) => {
    const transaction = await sequelize.transaction();
    const {
      nama,
      kelasterapiFE,
      satuanFE,
      kategoriFE,
      id,
      profileId,
      kode,
      aplikasiFE,
    } = req.body;

    console.log(req.body, "DATA EDIT OBAT!!!!");

    let riwayatFE = "";
    try {
      const editDataObat = await obat.update(
        {
          nama,
          kelasTerapiId: parseInt(kelasterapiFE.id),
          satuanId: parseInt(satuanFE.id),
          kategoriId: parseInt(kategoriFE.id),
          aplikasiId: parseInt(aplikasiFE.id),
        },
        {
          where: {
            id,
          },
        },
        { transaction }
      );

      const getUpdateRiwayat = await obat.findOne(
        {
          where: {
            id,
          },
          include: [
            {
              model: kategori,
              attributes: ["nama", "id"],
            },
            {
              model: kelasterapi,
              attributes: ["nama", "id"],
            },
            {
              model: satuan,
              attributes: ["nama", "id"],
            },
            {
              model: aplikasi,
              attributes: ["nama", "id"],
            },
          ],
        },
        { transaction }
      );

      if (kode === "kategori") {
        riwayatFE = `kategori ${kategoriFE.nama} diubah menjadi ${getUpdateRiwayat.kategori.nama}`;
      } else if (kode === "satuan") {
        riwayatFE = `satuan ${satuanFE.nama} diubah menjadi ${getUpdateRiwayat.satuan.nama}`;
      } else if (kode === "kelasterapi") {
        riwayatFE = `kelas terapi ${kelasterapiFE.nama} diubah menjadi ${getUpdateRiwayat.kelasterapi.nama}`;
      } else if (kode === "nama") {
        riwayatFE = `nama Obat diubah menjadi ${getUpdateRiwayat.nama}`;
      } else if (kode === "aplikasi") {
        riwayatFE = `Aplikasi diubah menjadi ${getUpdateRiwayat.aplikasi.nama}`;
      }

      const tambahRiwayat = await riwayat.create({
        obatId: id,
        profileId,
        riwayat: riwayatFE,
      });

      await transaction.commit();
      return res
        .status(200)
        .json({ massage: "data obat berhasil diubah", getUpdateRiwayat });
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  patchPenanggungJawab: async (req, res) => {
    const { selectedIds, profileId } = req.body; // Mengambil selectedIds dari req.body
    console.log(req.body);

    try {
      // Update data obat berdasarkan selectedIds
      const [updatedCount] = await obat.update(
        {
          profileId,
        },
        {
          where: {
            id: selectedIds, // Menggunakan selectedIds untuk kondisi where
          },
        }
      );

      return res.status(200).json({
        message: `${updatedCount} data obat berhasil diupdate`,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
  getPenanggungJawab: async (req, res) => {
    const profileId = parseInt(req.query.profileId);
    const kategoriId = parseInt(req.query.kategoriId);
    const whereCondition = { profileId };
    console.log(req.query.profileId);
    console.log(req.body.profileId);
    if (kategoriId) {
      whereCondition.kategoriId = kategoriId;
    }
    try {
      const result = await obat.findAll({
        attributes: ["nama", "profileId", "id"],
        where: whereCondition,
        include: [
          { model: satuan },
          { model: kategori },
          { model: kelasterapi },
        ],
      });

      const dataKategori = await kategori.findAll({
        attributes: ["nama", "id"],
      });
      res.status(200).send({
        result,
        dataKategori,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  getObatProfile: async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const alfabet = req.query.alfabet || "ASC";
    const time = req.query.time || "ASC";
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const profileId = req.params.profileId;
    const puskesmasId = req.query.puskesmasId || null;
    console.log(profileId, startDate, endDate, puskesmasId, "INI DATA");

    const whereConditionPKM = {};
    const whereCondition = {
      statusAmprahanId: {
        [Op.between]: [1, 4],
      },
      isOpen: 0,
    };
    if (startDate && endDate) {
      whereCondition.tanggal = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (puskesmasId) {
      whereConditionPKM.id = puskesmasId;
    }
    try {
      const result = await amprahan.findAll({
        attributes: ["tanggal"],
        include: [
          {
            model: amprahanItem,
            attributes: ["permintaan"],
            required: true,
            include: [
              {
                model: noBatch,
                attributes: ["noBatch", "exp"],
                required: true,
                include: [
                  {
                    model: obat,
                    where: { profileId },
                    include: [
                      {
                        model: satuan,
                        attributes: ["nama"],
                      },
                    ],
                    required: true,
                    attributes: ["nama"],
                  },
                ],
              },
            ],
          },
          {
            model: uptd,
            required: true,
            attributes: ["nama", "id"],
            where: whereConditionPKM,
          },
          { model: StatusAmprahan, attributes: ["nama"] },
        ],
        where: whereCondition,
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
};
