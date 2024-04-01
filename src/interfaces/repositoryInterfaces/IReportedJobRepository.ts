import ReportedJob from "../entityInterfaces/IReportedJob"


interface IReportedJobRepository{
    reportJob(data: ReportedJob): Promise<ReportedJob | null>
    getAllReportedJobs(page: number, limit: number, searchQuery: string): Promise<ReportedJob[]>
    getReportedJobsCount(searchQuery: string): Promise<number>
    changeReportJobStatus(reportJobId: string): Promise<void>
    reportedJobDetails(jobId: string): Promise<ReportedJob | null>

}
export default IReportedJobRepository
