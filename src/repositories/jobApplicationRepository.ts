import JobApplication from "../interfaces/entityInterfaces/IJobApplication";
import IJobApplicationRepository from "../interfaces/repositoryInterfaces/IJobApplicationRepository";
import JobApplicationModel from "../models/jobApplicationModel";


class JobApplicationRepository implements IJobApplicationRepository{

    async applyJob(data:JobApplication): Promise<JobApplication | null> {
        try {
            const Application = new JobApplicationModel({
                ...data,
                createdAt:new Date()
            })
            const savedApplication = await Application.save()
            return savedApplication as JobApplication
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async withdrawJobApplication(jobId: string, jobseekerId: string): Promise<JobApplication | null> {
        try {
            const jobApplication = await JobApplicationModel.findOneAndDelete({ jobId: jobId, jobseekerId: jobseekerId })
            return jobApplication
        } catch (error) {
            console.error(error)
            return null
        }
    }
    
}

export default JobApplicationRepository