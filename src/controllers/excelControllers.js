const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

module.exports = {
  postExcelAmprahan: async (req, res) => {
    // Menentukan path file template Excel
    const templatePath = path.join(__dirname, "../public/excel/template.xlsx");

    // Memeriksa apakah file ada
    if (!fs.existsSync(templatePath)) {
      return res.status(404).send("File template tidak ditemukan.");
    }

    // Mengirimkan file Excel sebagai response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.download(templatePath, "template.xlsx", (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).send("Error downloading the file.");
      }
    });
  },
};
