const express = require("express");
const { amprahanControllers } = require("../controllers");
const routers = express.Router();

routers.post("/post", amprahanControllers.postAmprahan);
routers.post("/post/amprahan-item", amprahanControllers.postAmprahanItem);
routers.get("/get/tujuan-amprahan", amprahanControllers.getAmprahan);
routers.get("/get/all-amprahan", amprahanControllers.getAllAmprahan);
routers.get("/get/detail/:amprahanId", amprahanControllers.getDetailAmprahan);
routers.get("/get/is-open", amprahanControllers.statusAmprahan);
routers.patch("/tutup/:id", amprahanControllers.tutupAmprahan);
routers.patch("/patch/ubah-permintaan", amprahanControllers.ubahPermintaan);
routers.post("/delete/amparahan-item", amprahanControllers.deleteAmprahanItem);
routers.post("/kadaluwarsa", amprahanControllers.kadaluwarsa);

module.exports = routers;
