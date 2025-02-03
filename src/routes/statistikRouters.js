const express = require("express");
const { statistikControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/detail-obat/:obatId", statistikControllers.getDetailObat);
routers.get("/get/tujuan-obat/:obatId", statistikControllers.getTujuanObat);
routers.get("/get/statistik-obat", statistikControllers.getAllStatistik);
routers.get("/get/daftar-obat", statistikControllers.getDaftarObat);

module.exports = routers;
