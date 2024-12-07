const express = require("express");
const { obatControllers } = require("../controllers");

const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post("/post", obatControllers.addObat);
routers.get("/get", obatControllers.getAllObat);
routers.get("/get/obat-masuk", obatControllers.getObatMasuk);
routers.get("/get-nama", obatControllers.getNamaObat);
routers.post("/delete", obatControllers.deletObat);
routers.get("/edit/:obatId", obatControllers.getOneObat);
routers.get("/detail/:obatId", obatControllers.getDetailObat);
routers.get("/get/kadaluwarsa", obatControllers.getKadaluwarsa);
routers.patch("/patch/obat", obatControllers.patchObat);

module.exports = routers;
