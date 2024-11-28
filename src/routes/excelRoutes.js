const express = require("express");
const { excelControllers } = require("../controllers");
const routers = express.Router();

routers.post("/amprahan", excelControllers.postExcelAmprahan);

module.exports = routers;
