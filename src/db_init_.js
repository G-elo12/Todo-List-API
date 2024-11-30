const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conexión exitosa con SQLite.');
    }
});


db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            userId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users (id)
        )
    `);

    console.log('Tablas creadas exitosamente.');
});


db.close((err) => {
    if (err) {
        console.error('Error al cerrar la conexión:', err.message);
    } else {
        console.log('Conexión cerrada.');
    }
});
