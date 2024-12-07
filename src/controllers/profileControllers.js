const { db, dbquery } = require("../database");
const {
  satuan,
  sequelize,
  kelasterapi,
  kategori,
  profile,
  userrole,
  user,
} = require("../models");
const fs = require("fs");

module.exports = {
  getOneProfile: async (req, res) => {
    console.log(req.params.id);
    try {
      const result = await profile.findOne({
        where: {
          userId: req.params.id,
        },
        include: [
          {
            model: user,
            attributes: ["email"],
          },
        ],
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
  tambahRole: async (req, res) => {
    try {
      const result = await userrole.create({
        userId,
        roleId,
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

  ubahProfile: async (req, res) => {
    try {
      const { nama, tanggalLahir, nip, jabatan, userId } = req.body;
      console.log(req.body, "EFIT PROFILE");
      await profile.update(
        {
          nama,
          birthdate: tanggalLahir,
          nip,
          jabatan,
        },
        {
          where: {
            userId,
          },
        }
      );

      return res.status(200).json({
        message: "berhasil ubah profile",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },

  ubahProfileFoto: async (req, res) => {
    try {
      const { profilePic, nip, userId, old_img } = req.body;
      const filePath = "profile";
      const { filename } = req.file;

      console.log(req.body, "INI EDIG FOTOOOOOOOO");
      if (req.file?.filename) {
        const path = `${__dirname}/../public/${old_img}`;

        await fs.unlink(path, (err) => {
          if (err) {
            console.error("erornya =>" + err);
            return;
          }
        });

        const updateProfile = await profile.update(
          {
            profilePic: `/${filePath}/${filename}`,
          },
          {
            where: {
              userId,
            },
          }
        );
      }

      return res.status(200).json({
        message: "berhasil ubah profile",
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
