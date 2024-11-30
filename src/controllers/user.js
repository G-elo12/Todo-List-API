const UserServices = require("../services/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userServices = new UserServices();

class ControllerUser {
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userServices.register(name, email, hashedPassword);

      res.status(201).json({ message: "Usuario registrado con éxito", user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userServices.get(email);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id_user: user.id },
        "secreto",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = ControllerUser;
