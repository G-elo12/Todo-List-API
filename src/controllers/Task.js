const TaskServices = require("../services/task");

const taskServices = new TaskServices();
class ControllerTask {
  async create(req, res) {
    try {
      const userId = req.user.id_user; 
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: "Título y descripción son requeridos." });
      }

      const task = await taskServices.add(title, description, userId);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const userId = req.user.id_user;
      const id = req.params.id;

      const task = await taskServices.get(id, userId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const userId = req.user.id_user;
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10; 
  
      if (page < 1 || limit < 1) {
        return res.status(400).json({ error: "Parámetros de paginación inválidos." });
      }
  
      const tasks = await taskServices.getAll(userId, page, limit);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

  async deleteById(req, res) {
    try {
      const userId = req.user.id_user;
      const id = req.params.id;

      const result = await taskServices.delete(id, userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateById(req, res) {
    try {
      const userId = req.user.id_user;
      const id = req.params.id;
      const { title, description } = req.body;

      if (!title && !description) {
        return res.status(400).json({ error: "Debes proporcionar al menos un campo para actualizar (título o descripción)." });
      }

      const task = await taskServices.update(id, title, description, userId);
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ControllerTask;
