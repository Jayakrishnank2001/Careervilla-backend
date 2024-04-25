import { IRes } from "../common/ICommon";
import JobApplication from "../entityInterfaces/IJobApplication";

export interface IJobApplicationService {
    applyJob(data: JobApplication): Promise<IRes>
    getJobApplications(jobId: string, status: string): Promise<JobApplication[]>
    changeApplicationStatus(applicationId: string, status: string): Promise<IRes>
    getAppliedJobsApplications(jobseekerId: string): Promise<JobApplication[]>
    
}

