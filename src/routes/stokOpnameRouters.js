const express = require("express");
const { stokOpnameControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/:profileId", stokOpnameControllers.getStokOpname);

module.exports = routers;
