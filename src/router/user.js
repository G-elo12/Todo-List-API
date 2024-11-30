const express = require("express");
const ControllerUser = require("../controllers/user");

const controllersUser = new ControllerUser();
const routerUser = express.Router();

routerUser.post("/register", (req, res) => controllersUser.create(req, res));
routerUser.post("/login", (req, res) => controllersUser.login(req, res));

module.exports = routerUser;
