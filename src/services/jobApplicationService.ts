import { IJobApplicationService } from "../interfaces/serviceInterfaces/IJobApplicationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";
import JobApplicationRepository from "../repositories/jobApplicationRepository";
import { IResponse } from "../interfaces/common/ICommon";

class JobApplicationService implements IJobApplicationService {

    constructor(private jobApplicationRepository: JobApplicationRepository) { }

    async applyJob(resume: string, jobId: string, jobseekerId: string): Promise<IResponse> {
        try {
            await this.jobApplicationRepository.applyJob(resume, jobId, jobseekerId)
            return {
                status: STATUS_CODES.OK,
                data: {
                    success: true,
                    message: 'Successfully applied for the Job'
                }
            }

        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

}
export default JobApplicationService