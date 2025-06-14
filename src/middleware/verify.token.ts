import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service';

interface JwtPayload {
  id: number;
  role: string;
}

// Extiende la interfaz Request para agregar el usuario decodificado
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token requerido' });
    return;
  }

  try {
    // Verifica si el token está en la blacklist
    if (authService.isTokenBlacklisted(token)) {
      res.status(401).json({ message: 'Token inválido (logout realizado)' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
