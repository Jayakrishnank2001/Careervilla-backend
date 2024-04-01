import { STATUS_CODES } from "../constants/httpStatusCodes";
import { IApiRes, IRes } from "../interfaces/common/ICommon";
import ReportedJob from "../interfaces/entityInterfaces/IReportedJob";
import { IReportedJobService, IReportedJobsAndCount } from "../interfaces/serviceInterfaces/IReportedJobService";
import JobRepository from "../repositories/jobRepository";
import ReportedJobRepository from "../repositories/reportedJobRepository";


class ReportedJobService implements IReportedJobService {

    constructor(private reportedJobRepository: ReportedJobRepository,
        private jobRepository: JobRepository) { }

    async reportJob(data: ReportedJob): Promise<IRes | undefined> {
        try {
            const reportedJob = await this.reportedJobRepository.reportJob(data)
            if (reportedJob) {
                return {
                    success: true,
                    message: 'Job reported successfully'
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllReportedJobs(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IReportedJobsAndCount | null>> {
        try {
            if (isNaN(page)) page = 1
            if (isNaN(limit)) limit = 10
            if (!searchQuery) searchQuery = ''
            const reportedJobs = await this.reportedJobRepository.getAllReportedJobs(page, limit, searchQuery)
            const reportedJobsCount = await this.reportedJobRepository.getReportedJobsCount(searchQuery)
            return {
                status: STATUS_CODES.OK,
                message: 'success',
                data: { reportedJobs, reportedJobsCount }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async blockReportedJob(jobId: string, reportJobId: string): Promise<IRes | undefined> {
        try {
            await this.jobRepository.blockReportedJob(jobId)
            await this.reportedJobRepository.changeReportJobStatus(reportJobId)
            return {
                success: true,
                message:'Successful'
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async reportedJobDetails(jobId: string): Promise<ReportedJob | null> {
        try {
            const reportedJob = await this.reportedJobRepository.reportedJobDetails(jobId)
            return reportedJob
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }


}
export default ReportedJobService