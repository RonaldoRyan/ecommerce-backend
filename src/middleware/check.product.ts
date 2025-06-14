import { Request, Response, NextFunction } from 'express';
import { db } from '../config/db';

export const checkProductExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const productId = req.body.productId || req.params.productId;

  if (!productId || isNaN(Number(productId))) {
    res.status(400).json({ error: 'El productId es requerido y debe ser un número válido' });
    return;
  }

  try {
    const [rows] = await db.query('SELECT id FROM products WHERE id = ?', [productId]);

    if ((rows as any[]).length === 0) {
      res.status(404).json({ error: 'El producto no existe' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error en checkProductExists middleware:', error);
    next(error);  // Para middleware global de errores
  }
};
