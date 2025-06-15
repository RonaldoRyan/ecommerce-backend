import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

export async function runScript() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    const sqlPath = path.join(__dirname, '../db/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    await connection.query(sql);

    console.log(' Script SQL ejecutado correctamente');
    await connection.end();
  } catch (error) {
    console.error(' Error ejecutando el script:', error);
  }
}


