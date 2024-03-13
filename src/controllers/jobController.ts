import { Request, Response } from "express";
import JobService from "../services/jobService";




class JobController{
    constructor(private jobService: JobService) { }
    
    async saveJob(req: Request, res: Response) {
        try {
            console.log(req.body)
            const jobData = req.body
            const newJob = await this.jobService.saveJob(jobData)
            res.status(newJob.status).json(newJob)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }




}
export default JobController