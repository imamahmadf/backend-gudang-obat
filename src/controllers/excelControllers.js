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
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const express = require("express");
const app = express();

module.exports = {
  postExcelAmprahan: async (req, res) => {
    try {
      const sourceFilePath = path.join(
        __dirname,
        "..",
        "public",
        "excel",
        "AMPRAHAN.xlsx"
      );
      const downloadPath = path.join(__dirname, "..", "downloads");
      const newFileName = `AMPRAHAN_${Date.now()}.xlsx`;
      const tempFilePath = path.join(__dirname, "..", "temp", newFileName);
      console.log("File path:", sourceFilePath); // Log file path

      if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(sourceFilePath);

      const worksheet = workbook.getWorksheet("AMPRAHAN");

      worksheet.getCell("A1").value = "CEK!@#1223";
      await workbook.xlsx.writeFile(tempFilePath);

      res.download(tempFilePath, newFileName, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          return res.status(500).send("Terjadi kesalahan saat mengirim file.");
        }
        fs.unlinkSync(tempFilePath);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err,
      });
    }
  },
};
