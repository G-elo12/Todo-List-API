const db = require("../databases/db");

class UserServices {
  async register(name, email, password) {
    return new Promise((resolve, reject) => {
      try {
        db.run(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, password],
          function (err) {
            if (err) {
              reject(new Error("Error al registrar usuario: " + err.message));
            } else {
              resolve({ id: this.lastID, name, email });
            }
          }
        );
      } catch (err) {
        reject(new Error("Error interno del servidor."));
      }
    });
  }
  async get(email) {
    return new Promise((resolve, reject) => {
      try {
        db.get(
          "SELECT id, name, email, password FROM users WHERE email = ?",
          [email],
          (err, row) => {
            if (err) {
              reject(new Error("Error al obtener usuario: " + err.message));
            } else if (!row) {
              reject(new Error("Usuario no encontrado"));
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
}

module.exports = UserServices;
