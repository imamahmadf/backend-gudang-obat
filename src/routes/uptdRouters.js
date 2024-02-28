const express = require("express");
const { uptdControllers } = require("../controllers");

const routers = express.Router();

routers.get("/puskesmas-detail/:id", uptdControllers.getOnePuskesmas);
routers.get("/perusahaan", uptdControllers.getPerusahaan);
routers.post("/perusahaan", uptdControllers.addPerusahaan);
routers.get("/puskesmas", uptdControllers.getAllPuskesmas);

module.exports = routers;
