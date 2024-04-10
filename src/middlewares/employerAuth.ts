import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { STATUS_CODES } from '../constants/httpStatusCodes';
import EmployerModel from '../models/employerModel';

const { UNAUTHORIZED, FORBIDDEN } = STATUS_CODES

export const employerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
        return
    }
    const employer = verifyToken(token);
    if (employer == null) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
    }
    const employerData = await EmployerModel.findOne({ email: employer.email })
    if (!employer) {
        res.status(FORBIDDEN).json({ message: 'Forbidden' });
        return
    } else if (employerData?.isBlocked == true) {
        res.status(UNAUTHORIZED).json({ message: 'Your account has been blocked by admin !' })
        return
    }
    (req as any).employer = employer;
    next();
};



