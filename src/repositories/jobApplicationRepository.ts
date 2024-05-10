import JobApplication from "../interfaces/entityInterfaces/IJobApplication";
import IJobApplicationRepository from "../interfaces/repositoryInterfaces/IJobApplicationRepository";
import JobApplicationModel from "../models/jobApplicationModel";


class JobApplicationRepository implements IJobApplicationRepository {

    async applyJob(data: JobApplication): Promise<JobApplication | null> {
        try {
            const Application = new JobApplicationModel({
                ...data,
                createdAt: new Date()
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

    async getJobApplications(jobId: string, status: string): Promise<JobApplication[]> {
        try {
            if (status == 'undefined') {
                return await JobApplicationModel.find({ jobId: jobId }).populate('jobseekerId')
            } else {
                return await JobApplicationModel.find({ jobId: jobId, status: status }).populate('jobseekerId')
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async changeApplicationStatus(applicationId: string, status: string): Promise<void> {
        try {
            await JobApplicationModel.findByIdAndUpdate(applicationId, { status: status })
        } catch (error) {
            throw new Error('Error occured')
        }
    }

    async getAppliedJobsApplications(jobseekerId: string): Promise<JobApplication[]> {
        try {
            return await JobApplicationModel.find({ jobseekerId: jobseekerId }).populate('jobId')
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async addRejectionReason(applicationId: string, reason: string): Promise<void> {
        try {
            await JobApplicationModel.findByIdAndUpdate(applicationId, { rejectionReason: reason })
        } catch (error) {
            throw new Error('Error occured')
        }
    }







}

export default JobApplicationRepository