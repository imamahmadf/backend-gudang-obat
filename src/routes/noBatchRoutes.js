const express = require("express");
const { noBatchControllers } = require("../controllers");
const routers = express.Router();

routers.post("/post", noBatchControllers.postNoBatch);

module.exports = routers;
