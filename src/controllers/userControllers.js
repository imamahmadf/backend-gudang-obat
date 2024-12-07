const { db, dbquery } = require("../database");
const {
  noBatch,
  profile,
  userRole,
  role,
  user,
  sequelize,
} = require("../models");

module.exports = {
  getAllProfile: async (req, res) => {
    try {
      const result = await profile.findAll({
        order: [["nama", "ASC"]],
      });

      res.status(200).send({
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },

  getUserRole: async (req, res) => {
    try {
      const result = await profile.findAll({
        include: [
          {
            model: user,
            attributes: ["email"],
            include: [
              {
                model: userRole,
                include: [
                  {
                    model: role,
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.send({ result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
  userRedux: async (req, res) => {
    try {
      //console.log(req.query.id);
      // const email = req.query.email
      const id = req.query.id; // userId
      const globalState = await user.findOne({
        include: [
          {
            model: profile,
            attributes: ["nama", "profilePic", "id"],
          },
          {
            model: userRole,
            attributes: ["roleId"],
          },
        ],
        where: {
          id,
        },
      });
      // console.log(globalState);
      return res.status(200).json({
        globalState,
      });
    } catch (err) {
      //console.log(err);
      return res.status(500).json({
        message: "your email not registered",
      });
    }
  },

  addUser: async (req, res) => {
    console.log(req.body, "CEK 123");
    try {
      const {
        id,
        name,
        email,

        firebaseProviderId,
      } = req.body;

      const newUser = await user.create({
        id,
        firebaseProviderId,
        email,
      });

      const newProfile = await profile.create({
        nama: name,
        userId: id,
      });
      const newUserRole = await userRole.create({
        userId: id,
        roleId: 1,
      });
      // const result = await sequelize.transaction(async (t) => {
      //   const user = await user.create(
      //     {
      //       id: id,
      //       firebaseProviderId: firebaseProviderId,
      //       email: email,
      //     },
      //     { transaction: t }
      //   );

      //   const profile = await profile.create(
      //     {
      //       name: name,
      //       nip: 123,
      //       userId: id,
      //     },
      //     { transaction: t }
      //   );

      //   const userProfile = await userRole.create(
      //     {
      //       userId: id,
      //       roleId: 2,
      //     },
      //     { transaction: t }
      //   );

      //   return {
      //     id: id,
      //     name: name,
      //     firebaseProviderId: firebaseProviderId,
      //     email: email,
      //   };
      // });

      return res.status(200).json({
        newUser,
        newProfile,
        newUserRole,
        message: "success add data",
        code: 200,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.toString(),
        code: 500,
      });
    }
  },
};
