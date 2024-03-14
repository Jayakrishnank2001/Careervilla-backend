import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { UNAUTHORIZED, FORBIDDEN } = STATUS_CODES

export const employerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
        return
    }
    const employer = verifyToken(token);
    if (!employer) {
        res.status(FORBIDDEN).json({ message: 'Forbidden' });
        return
    }
    (req as any).employer = employer;
    next();
};



