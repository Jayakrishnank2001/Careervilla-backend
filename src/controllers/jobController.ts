import { Request, Response } from "express";
import JobService from "../services/jobService";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import { searchQuery } from "../interfaces/entityInterfaces/IJob";

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
            const page = parseInt(req.query.page as string)
            const pageSize = parseInt(req.query.pageSize as string)
            const companyId = req.query.companyId as string
            const jobseekerId=req.query.jobseekerId as string
            const { jobTitle, location, experience, industryName, jobType } = req.query as unknown as searchQuery
            const searchQuery = { jobTitle, location, experience, industryName, jobType }
            const jobs = await this.jobService.getAllJobs(page, pageSize, companyId, searchQuery,jobseekerId)
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