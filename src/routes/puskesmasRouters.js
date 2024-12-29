const express = require("express");
const { puskesmasControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/:puskesmasId", puskesmasControllers.getPuskesmas);

module.exports = routers;
