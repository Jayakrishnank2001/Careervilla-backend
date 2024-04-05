import { Request, Response } from "express";
import JobApplicationService from "../services/jobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class JobApplicationController{
    constructor(private jobApplicationService: JobApplicationService) { }
    
    async applyJob(req: Request, res: Response) {
        try {
            const data = req.body
            const jobApplied = await this.jobApplicationService.applyJob(data)
            res.status(STATUS_CODES.OK).json(jobApplied)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }
}

export default JobApplicationController