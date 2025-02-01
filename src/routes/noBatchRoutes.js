const express = require("express");
const { noBatchControllers } = require("../controllers");
const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.post(
  "/post",
  fileUploader({
    destinationFolder: "noBatch",
    fileType: "image",
    prefix: "NOBATCH",
  }).single("pic"),
  noBatchControllers.postNoBatch
);
routers.post("/terima", noBatchControllers.terima);
module.exports = routers;

routers.post("/tolak", noBatchControllers.tolak);

routers.patch(
  "/edit",
  fileUploader({
    destinationFolder: "noBatch",
    fileType: "image",
    prefix: "NOBATCH",
  }).single("pic"),
  noBatchControllers.editNobatch
);

routers.get("/get/stok-nol", noBatchControllers.getNol);
routers.post("/delete/stok-nol", noBatchControllers.deleteAll);
