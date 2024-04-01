import { IJob } from "../interfaces/common/ICommon";
import Job from "../interfaces/entityInterfaces/IJob";
import IJobRepository from "../interfaces/repositoryInterfaces/IJobRepository";
import JobModel from "../models/jobModel";



class JobRepository implements IJobRepository {
    async saveJob(jobData: Job, companyId: string, addressId: string,): Promise<Job | null> {
        try {
            const newJob = new JobModel({
                addressId: addressId,
                companyId: companyId,
                ...jobData
            })
            const savedJob = await newJob.save()
            return savedJob as Job
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllJobs(): Promise<Job[]> {
        try {
            const jobs = await JobModel.find({isBlocked:false}).populate('companyId').populate('addressId').exec()
            return jobs.map((job) => job.toObject())
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async blockReportedJob(jobId: string): Promise<void> {
        try {
            const job = await JobModel.findById({ _id: jobId })
            if (job !== null) {
                job.isBlocked = !job.isBlocked
                await job.save()
            }
        } catch (error) {
            throw new Error('Error occured')
        }
    }

    
}
export default JobRepository