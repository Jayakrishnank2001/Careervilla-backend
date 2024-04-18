import { Request, Response } from "express";
import JobApplicationService from "../services/jobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";


class JobApplicationController {
    constructor(private jobApplicationService: JobApplicationService) { }

    async applyJob(req: Request, res: Response) {
        try {
            const applicationData = req.body
            const jobApplied = await this.jobApplicationService.applyJob(applicationData)
            res.status(STATUS_CODES.OK).json(jobApplied)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getJobApplications(req: Request, res: Response) {
        try {
            const jobApplications = await this.jobApplicationService.getJobApplications(req.params.jobId, req.query.status as string)
            res.status(STATUS_CODES.OK).json(jobApplications)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async changeApplicationStatus(req: Request, res: Response) {
        try {
            const updateStatus = await this.jobApplicationService.changeApplicationStatus(req.body.applicationId, req.body.status)
            res.status(STATUS_CODES.OK).json(updateStatus)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }


}

export default JobApplicationController