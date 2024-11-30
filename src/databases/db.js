const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conexión exitosa con SQLite.')
    }
});

module.exports = db;
