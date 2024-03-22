import { Request, Response } from "express";
import JobApplicationService from "../services/jobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class JobApplicationController{
    constructor(private jobApplicationService: JobApplicationService) { }
    
    async applyJob(req: Request, res: Response) {
        try {
            const jobseekerId = req.body.jobseekerId
            const jobId = req.body.jobId
            const resume = req.body.resume
            const jobApplied = await this.jobApplicationService.applyJob(resume, jobId, jobseekerId)
            res.status(jobApplied.status).json(jobApplied.data)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }
}

export default JobApplicationController