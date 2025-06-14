import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './verify.token';

export const isAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'No autenticado' });
    return; // Termina sin devolver Response, solo return void
  }
  next();
};
