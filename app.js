import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function rodarBanco() {
   
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database
    });

    await db.run("DROP TABLE IF EXISTS usuarios");
    await db.run(`
        CREATE TABLE usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            idade INTEGER
        )
    `);

    await db.run("INSERT INTO usuarios (nome, idade) VALUES (?, ?)", ["Maria", 25]);
    await db.run("INSERT INTO usuarios (nome, idade) VALUES (?, ?)", ["Joao", 18]);
    await db.run("INSERT INTO usuarios (nome, idade) VALUES (?, ?)", ["Ana", 30]);

    const todos = await db.all("SELECT * FROM usuarios");
    console.log("Todos os usuarios:", todos);

    const maiores = await db.all("SELECT * FROM usuarios WHERE idade > 20");
    console.log("Maiores de 20:", maiores);
}

rodarBanco();