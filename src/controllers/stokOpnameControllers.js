const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
} = require("../models");

module.exports = {
  getStokOpname: async (req, res) => {
    const { profileId } = req.params;

    try {
      console.log(profileId, "INI PROFILE IDDDD");

      const result = await obat.findAll({
        where: {
          profileId,
        },
        include: [
          {
            model: noBatch,
            attributes: ["noBatch", "exp"],
          },
        ],
      });
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
