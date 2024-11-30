const db = require("../databases/db");

class TaskServices {
  async add(title, description, userId) {
    return new Promise((resolve, reject) => {
      try {
        db.run(
          "INSERT INTO tasks (title, description, userId) VALUES (?, ?, ?)",
          [title, description, userId],
          function (err) {
            if (err) {
              reject(new Error("Error al registrar tarea: " + err.message));
            } else {
              resolve({ id: this.lastID, title, description, userId });
            }
          }
        );
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }

  async get(id, userId) {
    return new Promise((resolve, reject) => {
      try {
        db.get(
          "SELECT id, title, description FROM tasks WHERE id = ? AND userId = ?",
          [id, userId],
          (err, row) => {
            if (err) {
              reject(new Error("Error al obtener la tarea: " + err.message));
            } else if (!row) {
              reject(new Error("Tarea no encontrada."));
            } else {
              resolve(row);
            }
          }
        );
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }

  async getAll(userId, page, limit) {
    return new Promise((resolve, reject) => {
      try {
        const offset = (page - 1) * limit;
        db.all(
          "SELECT id, title, description FROM tasks WHERE userId = ? LIMIT ? OFFSET ?",
          [userId, limit, offset],
          (err, rows) => {
            if (err) {
              reject(new Error("Error al obtener las tareas: " + err.message));
            } else {
              resolve(rows);
            }
          }
        );
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }

  async update(id, title, description, userId) {
    return new Promise((resolve, reject) => {
      try {
        this.get(id, userId)
          .then((task) => {
            const newTitle = title !== undefined ? title : task.title;
            const newDescription =
              description !== undefined ? description : task.description;

            db.run(
              "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND userId = ?",
              [newTitle, newDescription, id, userId],
              function (err) {
                if (err) {
                  reject(
                    new Error("Error al actualizar la tarea: " + err.message)
                  );
                } else if (this.changes === 0) {
                  reject(new Error("Tarea no encontrada o no autorizada."));
                } else {
                  resolve({
                    id,
                    title: newTitle,
                    description: newDescription,
                    userId,
                  });
                }
              }
            );
          })
          .catch((err) => reject(err));
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }

  async delete(id, userId) {
    return new Promise((resolve, reject) => {
      try {
        db.run(
          "DELETE FROM tasks WHERE id = ? AND userId = ?",
          [id, userId],
          function (err) {
            if (err) {
              reject(new Error("Error al eliminar la tarea: " + err.message));
            } else if (this.changes === 0) {
              reject(new Error("Tarea no encontrada o no autorizada."));
            } else {
              resolve({ message: "Tarea eliminada exitosamente." });
            }
          }
        );
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }
}

module.exports = TaskServices;
