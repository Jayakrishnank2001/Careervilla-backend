import Job from "../interfaces/entityInterfaces/IJob";
import IJobRepository from "../interfaces/repositoryInterfaces/IJobRepository";
import JobModel from "../models/jobModel";



class JobRepository implements IJobRepository{
    async saveJob(jobData: Job, addressId: string, companyId: string): Promise<Job | null> {
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
}
export default JobRepository