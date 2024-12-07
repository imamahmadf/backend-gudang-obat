const express = require("express");
const { profileControllers } = require("../controllers");

const routers = express.Router();
const fileUploader = require("../middleware/uploader");

routers.get("/get/:id", profileControllers.getOneProfile);
routers.post("/tambah/role/:userId", profileControllers.tambahRole);
routers.patch("/patch", profileControllers.ubahProfile);
routers.patch(
  "/patch/foto",
  fileUploader({
    destinationFolder: "profile",
    fileType: "image",
    prefix: "PROFILE",
  }).single("pic"),
  profileControllers.ubahProfileFoto
);

module.exports = routers;
