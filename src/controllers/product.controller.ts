// controllers/product.controller.ts
import { Request, Response } from 'express';
import * as productService from '../services/products.service';
import { db } from '../config/db'; // Asegúrate de que la ruta sea correcta

// Suponiendo que usas db.query para obtener productos
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    const products = (rows as any[]).map(product => ({
      ...product,
      price: Number(product.price), // ✅ asegura que sea número
    }));

    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};


export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.getProductById(id);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    await productService.createProduct(req.body);
    res.status(201).json({ message: 'Producto creado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await productService.updateProduct(id, req.body);
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await productService.deleteProduct(id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
