const express = require("express");
const { excelControllers } = require("../controllers");
const routers = express.Router();

routers.get("/amprahan", excelControllers.postExcelAmprahan);

module.exports = routers;
