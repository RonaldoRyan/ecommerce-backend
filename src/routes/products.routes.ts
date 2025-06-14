import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';
import { verifyToken } from '../middleware/verify.token';
import { isAdmin } from '../middleware/isAdmin';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate.request';
import { validateProduct, validateGetProducts } from '../validators/products.validator';
import { handleValidationErrors } from '../middleware/handle.validationErrors';
const router = Router();

// Obtener todos los productos
router.get('/',validateGetProducts, validateProduct ,getProducts);

// Obtener un producto por ID
router.get('/:id', validateProduct, validateGetProducts,getProductById);

// Crear producto (solo admin)
router.post(
  '/',
  verifyToken,
  isAdmin,
  [
    body('name').notEmpty().withMessage('El nombre es requerido'),
    body('description').notEmpty().withMessage('La descripción es requerida'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo'),
    body('image').notEmpty().withMessage('La imagen es requerida')
  ],
  validateRequest,
  validateProduct,
  createProduct,
  handleValidationErrors

);

// only the admin can update a product
router.put(
  '/:id',
  verifyToken,
  isAdmin,
  [
    body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
    body('description').optional().notEmpty().withMessage('La descripción no puede estar vacía'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('El precio debe ser válido'),
    body('image').optional().notEmpty().withMessage('La imagen no puede estar vacía')
  ],
  validateRequest,
  validateProduct,
  handleValidationErrors,
  updateProduct
);

// only the admin can delete a product
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
