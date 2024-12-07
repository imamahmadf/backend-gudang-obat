const express = require("express");
const { alokasiControllers } = require("../controllers");

const routers = express.Router();

routers.get("/get", alokasiControllers.getAlokasi);

module.exports = routers;
