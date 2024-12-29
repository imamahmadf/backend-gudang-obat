const express = require("express");
const { laporanControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/:kategoriId", laporanControllers.getLaporan);

module.exports = routers;
