import { IJob } from "../common/ICommon"
import Job from "../entityInterfaces/IJob"


interface IJobRepository{
    saveJob(jobData: Job, addressId: string, companyId: string): Promise<Job | null>
    getAllJobs(): Promise<Job[]>
    blockReportedJob(jobId: string): Promise<void>

}
export default IJobRepository