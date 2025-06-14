import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/verify.token';
import { isAuth } from '../middleware/isAuth';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);

router.post('/admin/products', isAuth, isAdmin, (req, res) => {
  res.json({ message: 'Solo admins pueden crear productos' });
});


export default router;
