import { IJobApplicationService } from "../interfaces/serviceInterfaces/IJobApplicationService";
import JobApplicationRepository from "../repositories/jobApplicationRepository";
import { IRes } from "../interfaces/common/ICommon";
import JobApplication from "../interfaces/entityInterfaces/IJobApplication";
import JobseekerRepository from "../repositories/jobseekerRepository";

class JobApplicationService implements IJobApplicationService {

    constructor(private jobApplicationRepository: JobApplicationRepository,
        private jobseekerRepository: JobseekerRepository) { }

    async applyJob(data: JobApplication): Promise<IRes> {
        try {
            await this.jobApplicationRepository.applyJob(data)
            await this.jobseekerRepository.appliedJob(data.jobseekerId, data.jobId)
            await this.jobseekerRepository.unsaveJob(data.jobseekerId, data.jobId)
            return {
                success: true,
                message: 'Successfully applied for the Job'
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getJobApplications(jobId: string, status: string): Promise<JobApplication[]> {
        try {
            const jobApplications = await this.jobApplicationRepository.getJobApplications(jobId, status)
            return jobApplications
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async changeApplicationStatus(applicationId: string, status: string): Promise<IRes> {
        try {
            await this.jobApplicationRepository.changeApplicationStatus(applicationId, status)
            return {
                success: true,
                message: 'Status updated'
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAppliedJobsApplications(jobseekerId: string): Promise<JobApplication[]> {
        try {
            const applications = await this.jobApplicationRepository.getAppliedJobsApplications(jobseekerId)
            return applications
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async addRejectionReason(applicationId: string, reason: string): Promise<IRes> {
        try {
            await this.jobApplicationRepository.addRejectionReason(applicationId, reason)
            return {
                success: true,
                message: 'Rejection reason added'
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }




}
export default JobApplicationService