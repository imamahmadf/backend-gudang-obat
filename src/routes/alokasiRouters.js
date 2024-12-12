const express = require("express");
const { alokasiControllers } = require("../controllers");

const routers = express.Router();

routers.get("/get/:obatId", alokasiControllers.getAlokasi);
routers.post("/post", alokasiControllers.postAlokasi);
routers.post("/post/item-alokasi", alokasiControllers.postItemAlokasi);
routers.post("/tutup-alokasi", alokasiControllers.tutupAlokasi);
routers.get("/get/all/alokasi", alokasiControllers.getAllAlokasi);
routers.get("/get/detail/:alokasiId", alokasiControllers.getDetailAlokasi);
module.exports = routers;
