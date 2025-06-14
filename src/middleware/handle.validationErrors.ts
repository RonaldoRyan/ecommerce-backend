import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export async function handleValidationErrors(req: Request, res: Response, next: NextFunction): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}
