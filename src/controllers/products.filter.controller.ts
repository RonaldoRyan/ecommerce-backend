import { Request, Response } from 'express';
import { getFilteredProducts } from '../services/product.filter.service';

export const getProductsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, limit, offset } = req.query;

    const limitNum = limit && !isNaN(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
    const offsetNum = offset && !isNaN(Number(offset)) && Number(offset) >= 0 ? Number(offset) : 0;

    const { products, total } = await getFilteredProducts({
      search: search as string | undefined,
      category: category as string | undefined,
      limit: limitNum,
      offset: offsetNum,
    });

    res.json({ products, total, limit: limitNum, offset: offsetNum });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
