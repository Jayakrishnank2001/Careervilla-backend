import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token){
        res.status(401).json({ message: 'Unauthorized' });
        return
    }
    const admin = verifyToken(token);
    if (!admin){
        res.status(403).json({ message: 'Forbidden' });
        return
    }
    (req as any).admin = admin;
    next();
};