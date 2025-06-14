import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import { errorHandler } from './middleware/error.handler';
import { db } from './config/db'; // Asegúrate de tener esto bien configurado

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(helmet());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Middleware de errores
app.use(errorHandler);

// Inicializar base de datos desde init.sql
const initDb = async () => {
  try {
    const filePath = path.join(__dirname, 'db', 'init.sql'); // Ajusta la ruta según tu estructura de carpetas
    const sql = fs.readFileSync(filePath, 'utf8');
    await db.query(sql);
    console.log('Base de datos inicializada correctamente con init.sql');
  } catch (err) {
    console.error('Error al ejecutar init.sql:', err);
  }
};

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await initDb(); // Ejecuta init.sql al arrancar
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
};

startServer();
