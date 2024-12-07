const express = require("express");
const { pengaturanControllers } = require("../controllers");

const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.get("/get/seeders", pengaturanControllers.getAllSeeders);
routers.post("/post/satuan", pengaturanControllers.postSatuan);
routers.post("/post/kategori", pengaturanControllers.postKategori);
routers.post("/post/kelas-terapi", pengaturanControllers.postKelasTerapi);
routers.post("/post/tujuan", pengaturanControllers.postTujuan);
routers.post("/post/sumber-dana", pengaturanControllers.postSumberDana);
routers.post("/delete/satuan", pengaturanControllers.deleteSatuan);
routers.post("/delete/kategori", pengaturanControllers.deleteKategori);
routers.post("/delete/kelas-terapi", pengaturanControllers.deleteKelasTerapi);

module.exports = routers;
