import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack || err);

  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message || 'Algo salió mal',
  });
};
