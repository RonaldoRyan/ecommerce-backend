// scripts/runInit.ts
import { initializeDatabase } from '../config/init.db';

initializeDatabase().catch((err) => {
  console.error('❌ Error al inicializar la base de datos:', err);
});
