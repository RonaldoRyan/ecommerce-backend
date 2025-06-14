import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cart.controller';
import { verifyToken } from '../middleware/verify.token';
import { validateRequest } from '../middleware/validate.request';
import { checkProductExists } from '../middleware/check.product';

const router = Router();

router.get('/', verifyToken, getCart);

router.post(
  '/',
  verifyToken,
  [
    body('productId').isInt().withMessage('productId debe ser un número entero'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('quantity debe ser un número entero mayor o igual a 1'),
  ],
  validateRequest,
  checkProductExists,
  addToCart
);

router.put(
  '/:productId',
  verifyToken,
  [
    param('productId').isInt().withMessage('productId debe ser un número entero'),
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('quantity debe ser un número entero mayor o igual a 1'),
  ],
  validateRequest,
  checkProductExists,
  updateCartItem
);

router.delete(
  '/:productId',
  verifyToken,
  [param('productId').isInt().withMessage('productId debe ser un número entero')],
  validateRequest,
  checkProductExists,
  removeCartItem
);

export default router;
