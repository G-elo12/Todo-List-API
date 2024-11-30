const express = require("express");
const ControllerTask = require("../controllers/Task");
const authenticateToken = require("../Middleware/token");

const routertask = express.Router();
const controllerTask = new ControllerTask();


routertask.post('todos', authenticateToken, (req, res) => controllerTask.create(req, res));
routertask.get('/tasks', authenticateToken, (req, res) => controllerTask.getAll(req, res));
/*routertask.get('/task/:id', authenticateToken, (req, res) => controllerTask.getById(req, res));*/
routertask.delete('/todos/:id', authenticateToken, (req, res) => controllerTask.deleteById(req, res));
routertask.put('/todos/:id', authenticateToken, (req, res) => controllerTask.updateById(req, res)); 

module.exports = routertask;
