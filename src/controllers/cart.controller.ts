// controllers/cart.controller.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/verify.token';
import * as cartService from '../services/cart.service';

export const getCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const result = await cartService.getCartItems(userId);
    res.json(result);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    await cartService.addToCart(userId, productId, quantity);
    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto' });
  }
};

export const updateCartItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const productId = parseInt(req.params.productId, 10);
    const { quantity } = req.body;

    await cartService.updateCartItem(userId, productId, quantity);
    res.json({ message: 'Cantidad actualizada' });
  } catch (error) {
    console.error('Error al actualizar cantidad:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

export const removeCartItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const productId = parseInt(req.params.productId, 10);

    await cartService.removeCartItem(userId, productId);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
