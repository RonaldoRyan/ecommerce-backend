import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';
import { isAuth} from '../middleware/isAuth';
import { isAdmin } from '../middleware/isAdmin';
import { productValidation } from '../validators/products.validator';
import { validateRequest } from '../middleware/validate.request';

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);


router.post('/', isAuth, isAdmin, productValidation, validateRequest, createProduct);

router.put('/:id', isAuth, isAdmin, productValidation, validateRequest, updateProduct);

router.delete('/:id', isAuth, isAdmin, deleteProduct);

export default router;
