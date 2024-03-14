import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { FORBIDDEN, UNAUTHORIZED } = STATUS_CODES

export const jobseekerAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
        return
    }
    const jobseeker = verifyToken(token);
    if (!jobseeker) {
        res.status(FORBIDDEN).json({ message: 'Forbidden' });
        return
    }
    (req as any).jobseeker = jobseeker;
    next();
};

