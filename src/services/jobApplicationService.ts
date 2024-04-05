import { IJobApplicationService } from "../interfaces/serviceInterfaces/IJobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";
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
            await this.jobseekerRepository.applyJob(data.jobseekerId, data.jobId)
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