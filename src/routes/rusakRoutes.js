const express = require("express");
const { rusakControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", rusakControllers.getRusak);
routers.post("/post/rusak-item", rusakControllers.postItemRusak);
routers.post("/post/open-rusak", rusakControllers.postRusak);
routers.post("/post/close-rusak", rusakControllers.closeRusak);

module.exports = routers;
