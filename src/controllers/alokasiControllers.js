const { db, dbquery } = require("../database");
const {
  amprahan,
  amprahanItem,
  noBatch,
  uptd,
  obat,
  satuan,
  sequelize,
  alokasi,
} = require("../models");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const express = require("express");
const app = express();

module.exports = {
  getAlokasi: async (req, res) => {
    try {
      const result = await alokasi.findAll({
        include: [
          {
            model: amprahan,
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
