import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './verify.token';

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'No autenticado' });
    return;
  }
  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Acceso denegado: solo admin' });
    return;
  }
  next();
};
