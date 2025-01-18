const express = require("express");
const { adminControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/all-amprahan/:obatId", adminControllers.getAll);

routers.patch("/edit/amprahan-item", adminControllers.editAmprahanItem);

routers.get("/get/obat/:obatId", adminControllers.getObat);

routers.post("/delete", adminControllers.deleteAmprahanItem);
routers.patch("/edit/no-batch", adminControllers.editNoBatch);
routers.patch("/edit/total-stok", adminControllers.editTotalStok);

module.exports = routers;
