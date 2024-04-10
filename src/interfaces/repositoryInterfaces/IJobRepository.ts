import { ObjectId } from "mongoose"
import Job from "../entityInterfaces/IJob"


interface IJobRepository{
    saveJob(jobData: Job, addressId: string, companyId: string,employerId:string): Promise<Job | null>
    getAllJobs(): Promise<Job[]>
    blockReportedJob(jobId: string): Promise<void>
    findJobById(jobId: ObjectId): Promise<Job | null>
    

}
export default IJobRepository