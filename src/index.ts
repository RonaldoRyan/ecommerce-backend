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

// Inicializar base de datos desde init.sql (solo si es necesario)
const initDb = async () => {
  try {
    console.log('🔄 Verificando base de datos...');
    
    // Verificar si las tablas ya existen para evitar duplicados
    const [rows] = await db.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name IN ('users', 'categories', 'products')
    `) as any[];
    
    const tableCount = (rows as any[])[0]?.count || 0;
    
    if (tableCount === 3) {
      console.log('✅ Base de datos ya inicializada');
      return;
    }
    
    console.log('🚀 Inicializando base de datos por primera vez...');
    const filePath = path.join(__dirname, 'db', 'init.sql');
    const sql = fs.readFileSync(filePath, 'utf8');
    await db.query(sql);
    console.log('✅ Base de datos inicializada correctamente');
    
  } catch (err) {
    console.error('❌ Error al inicializar base de datos:', err);
    console.log('⚠️  El servidor continuará ejecutándose, pero puede que necesites inicializar manualmente con: npm run init:db');
  }
};

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await initDb(); // Inicializa solo si es necesario
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📖 API disponible en: http://localhost:${PORT}/api`);
    console.log(`🔗 Rutas disponibles:`);
    console.log(`   • POST /api/auth/register`);
    console.log(`   • POST /api/auth/login`);
    console.log(`   • GET  /api/products`);
    console.log(`   • POST /api/products`);
  });
};

startServer();