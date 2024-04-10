import { IJobApplicationService } from "../interfaces/serviceInterfaces/IJobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import JobApplicationRepository from "../repositories/jobApplicationRepository";
import { IRes } from "../interfaces/common/ICommon";
import JobApplication from "../interfaces/entityInterfaces/IJobApplication";
import JobseekerRepository from "../repositories/jobseekerRepository";
import JobRepository from "../repositories/jobRepository";
import NotificationRepository from "../repositories/notificationRepository";

class JobApplicationService implements IJobApplicationService {

    constructor(private jobApplicationRepository: JobApplicationRepository,
        private jobseekerRepository: JobseekerRepository,
        private jobRepository: JobRepository,
        private notificationRepository: NotificationRepository) { }

    async applyJob(data: JobApplication): Promise<IRes> {
        try {
            await this.jobApplicationRepository.applyJob(data)
            await this.jobseekerRepository.appliedJob(data.jobseekerId, data.jobId)
            await this.jobseekerRepository.unsaveJob(data.jobseekerId, data.jobId)
            const job = await this.jobRepository.findJobById(data.jobId)
            const notificationPayload = {
                title: 'New Job Application Received',
                body: `Congratulations! A new application has been submitted for your ${job?.jobTitle} position.`
            }
            if(job?.postedBy)
            await this.notificationRepository.saveNotification(job?.postedBy, notificationPayload)
            return {
                success: true,
                message: 'Successfully applied for the Job'
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

}
export default JobApplicationService