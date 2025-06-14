import { body, query } from 'express-validator';

export const validateProduct = [
  body('name')
    .notEmpty().withMessage('El nombre es requerido'),

  body('description')
    .notEmpty().withMessage('La descripción es requerida'),

  body('price')
    .isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),

  body('image')
    .isURL().withMessage('La imagen debe ser una URL válida'),

  body('category')
    .optional() // if no is obligatory
    .notEmpty().withMessage('La categoría no puede estar vacía si se proporciona'),
];


export const validateGetProducts = [
  query('search')
    .optional()
    .isString()
    .withMessage('El parámetro search debe ser una cadena'),

  query('category')
    .optional()
    .isString()
    .withMessage('El parámetro category debe ser una cadena'),

  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El parámetro limit debe ser un entero positivo'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El parámetro offset debe ser un entero igual o mayor a 0'),
];