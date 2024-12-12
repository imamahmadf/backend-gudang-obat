const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get-profile", userControllers.getAllProfile);
routers.get("/get-role", userControllers.getUserRole);
routers.get("/redux-user", userControllers.userRedux);
routers.post("/register", userControllers.addUser);
routers.get("/get/role", userControllers.getRole);
routers.post("/post/user-role", userControllers.addRole);
routers.post("/delete/user-role", userControllers.deleteRole);

module.exports = routers;
