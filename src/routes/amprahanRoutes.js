const express = require("express");
const { amprahanControllers } = require("../controllers");
const routers = express.Router();

routers.post("/post", amprahanControllers.postAmprahan);
routers.post("/post/amprahan-item", amprahanControllers.postAmprahanItem);
routers.get("/get/tujuan-amprahan", amprahanControllers.getAmprahan);
routers.get("/get/all-amprahan", amprahanControllers.getAllAmprahan);
routers.get("/get/detail/:amprahanId", amprahanControllers.getDetailAmprahan);

module.exports = routers;
