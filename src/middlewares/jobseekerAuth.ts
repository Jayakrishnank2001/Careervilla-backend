import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export const jobseekerAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }
    const jobseeker = verifyToken(token);
    if (!jobseeker) {
        res.status(403).json({ message: 'Forbidden' });
        return
    }
    (req as any).jobseeker = jobseeker;
    next();
};

