const express = require("express");
const { obatControllers } = require("../controllers");

const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "obat",
    fileType: "image",
    prefix: "OBAT",
  }).single("pic"),
  obatControllers.addObat
);

routers.get("/get", obatControllers.getAllObat);

routers.get("/get-nama", obatControllers.getNamaObat);

routers.post("/delete", obatControllers.deletObat);

routers.get("/edit/:obatId", obatControllers.getOneObat);

routers.get("/detail/:obatId", obatControllers.getDetailObat);
module.exports = routers;
