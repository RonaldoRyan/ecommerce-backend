import { body, param } from 'express-validator';

export const validateAddToCart = [
  body('productId')
    .isInt({ min: 1 }).withMessage('El ID del producto debe ser un número entero positivo'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
];

export const validateUpdateCartItem = [
  param('productId')
    .isInt({ min: 1 }).withMessage('El ID del producto debe ser un número entero positivo'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
];
