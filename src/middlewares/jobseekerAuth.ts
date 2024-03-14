import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';
import { STATUS_CODES } from '../constants/httpStatusCodes';
import JobseekerModel from '../models/jobseekerModel';

const { FORBIDDEN, UNAUTHORIZED } = STATUS_CODES

export const jobseekerAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        res.status(UNAUTHORIZED).json({ message: 'Unauthorized' });
        return
    }
    const jobseeker = verifyToken(token);
    const jobseekerData=await JobseekerModel.findOne({email:jobseeker.email})
    if (!jobseeker) {
        res.status(FORBIDDEN).json({ message: 'Forbidden' });
        return
    } else if (jobseekerData?.isBlocked == true) {
        res.status(UNAUTHORIZED).json({ message: 'Unauthorized' })
        return
    }
    (req as any).jobseeker = jobseeker;
    next();
};

