import { IApiRes, IRes } from "../common/ICommon";
import ReportedJob from "../entityInterfaces/IReportedJob";


export interface IReportedJobService{
    reportJob(data: ReportedJob): Promise<IRes | undefined>
    getAllReportedJobs(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IReportedJobsAndCount | null>>
    blockReportedJob(jobId: string, reportJobId: string): Promise<IRes | undefined>
    reportedJobDetails(jobId: string): Promise<ReportedJob | null>
    
}


export interface IReportedJobsAndCount{
    reportedJobs: ReportedJob[],
    reportedJobsCount:number
  }