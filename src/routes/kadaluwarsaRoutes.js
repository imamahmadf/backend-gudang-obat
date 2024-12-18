const express = require("express");
const { kadaluwarsaControllers } = require("../controllers");
const routers = express.Router();

routers.post("/kadaluwarsa", kadaluwarsaControllers.kadaluwarsa);
routers.get("/get/kadaluwarsa", kadaluwarsaControllers.getKadaluwarsa);

module.exports = routers;
