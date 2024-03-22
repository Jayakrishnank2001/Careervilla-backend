import { Request, Response } from "express";
import JobService from "../services/jobService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

class JobController {
    constructor(private jobService: JobService) { }

    async saveJob(req: Request, res: Response) {
        try {
            const jobData = req.body
            console.log(jobData)
            const newJob = await this.jobService.saveJob(jobData)
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




}
export default JobController