import { Request, Response } from "express";
import ReportedJobService from "../services/reportedJobService";
import { STATUS_CODES } from "../constants/httpStatusCodes";

class ReportedJobController {

    constructor(private reportedJobService: ReportedJobService) { }

    async reportJob(req: Request, res: Response) {
        try {
            const reportJobData = req.body
            const reportJob = await this.reportedJobService.reportJob(reportJobData)
            if (reportJob) {
                res.status(STATUS_CODES.OK).json(reportJob)
            }
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async getAllReportedJobs(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string)
            const limit = parseInt(req.query.limit as string)
            const searchQuery = req.query.searchQuery as string | undefined
            const data = await this.reportedJobService.getAllReportedJobs(page, limit, searchQuery)
            res.status(STATUS_CODES.OK).json(data)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }

    async blockReportedJob(req: Request, res: Response) {
        try {
            const blockReportedJob = await this.reportedJobService.blockReportedJob(req.body.jobId, req.body.reportJobId)
            res.status(STATUS_CODES.OK).json(blockReportedJob)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }

    async reportedJobDetails(req: Request, res: Response) {
        try {
            const reportedJob = await this.reportedJobService.reportedJobDetails(req.params.jobId)
            res.status(STATUS_CODES.OK).json(reportedJob)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }




}
export default ReportedJobController