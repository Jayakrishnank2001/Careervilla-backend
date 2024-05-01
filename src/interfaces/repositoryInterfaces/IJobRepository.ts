import { ObjectId } from "mongoose"
import Job from "../entityInterfaces/IJob"


interface IJobRepository {
    saveJob(jobData: Job, addressId: string, companyId: string, employerId: string): Promise<Job | null>
    getAllJobs(page: number, pageSize: number, companyId: string, jobTitle:string,location:string,experience:string): Promise<Job[]>
    blockReportedJob(jobId: string): Promise<void>
    findJobById(jobId: ObjectId): Promise<Job | null>
    updateJob(jobData: Job, jobId: string): Promise<Job | null>
    updateJobStatus(jobId: string): Promise<void>

}
export default IJobRepository