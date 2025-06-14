import fs from 'fs';
import path from 'path';
import { db } from '../config/db';

export async function initDb() {
  try {
    const sqlPath = path.join(__dirname, '../db/init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    await db.query(sql);
    console.log('Base de datos inicializada correctamente con init.sql');
  } catch (error) {
    console.error('Error ejecutando init.sql:', error);
  }
}
