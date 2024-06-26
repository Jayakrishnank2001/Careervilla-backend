import { ObjectId } from "mongoose"
import Job, { searchQuery } from "../entityInterfaces/IJob"


interface IJobRepository {
    saveJob(jobData: Job, addressId: string, companyId: string, employerId: string,industryId:string): Promise<Job | null>
    getAllJobs(companyId: string, searchQuery:searchQuery): Promise<Job[]>
    blockReportedJob(jobId: string): Promise<void>
    findJobById(jobId: ObjectId): Promise<Job | null>
    updateJob(jobData: Job, jobId: string,industryId:string): Promise<Job | null>
    updateJobStatus(jobId: string): Promise<void>
    findJob(jobId: string): Promise<Job | null>

}
export default IJobRepository