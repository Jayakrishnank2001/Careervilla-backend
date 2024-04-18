import { Request, Response } from "express";
import JobService from "../services/jobService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

class JobController {
    constructor(private jobService: JobService) { }

    async saveJob(req: Request, res: Response) {
        try {
            const jobData = req.body
            const newJob = await this.jobService.saveJob(jobData, req.params.employerId)
            res.status(newJob.status).json(newJob)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getAllJobs(req: Request, res: Response) {
        try {
            const jobs = await this.jobService.getAllJobs()
            res.status(STATUS_CODES.OK).json(jobs)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getJobDetails(req: Request, res: Response) {
        try {
            const job = await this.jobService.getJobDetails(req.params.jobId)
            if (job) {
                res.status(STATUS_CODES.OK).json(job)
            }
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async updateJob(req: Request, res: Response) {
        try {
            const updateJob = await this.jobService.updateJob(req.body.jobData, req.body.jobId, req.body.addressId)
            if (updateJob) {
                res.status(updateJob.status).json(updateJob)
            }
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async updateJobStatus(req: Request, res: Response) {
        try {
            const updateJob = await this.jobService.updateJobStatus(req.params.jobId)
            res.status(updateJob.status).json(updateJob)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }





}
export default JobController