import JobApplication from "../interfaces/entityInterfaces/IJobApplication";
import IJobApplicationRepository from "../interfaces/repositoryInterfaces/IJobApplicationRepository";
import JobApplicationModel from "../models/jobApplicationModel";


class JobApplicationRepository implements IJobApplicationRepository{

    async applyJob(resume:string,jobId:string,jobseekerId:string): Promise<JobApplication | null> {
        try {
            const Application = new JobApplicationModel({
                jobId: jobId,
                jobseekerId: jobseekerId,
                resume: resume,
                createdAt:new Date()
            })
            const savedApplication = await Application.save()
            return savedApplication
        } catch (error) {
            console.error(error)
            return null
        }
    }
    
}

export default JobApplicationRepository