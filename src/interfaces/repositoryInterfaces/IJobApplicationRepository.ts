import JobApplication from "../entityInterfaces/IJobApplication"

interface IJobApplicationRepository {
    applyJob(data: JobApplication): Promise<JobApplication | null>
    withdrawJobApplication(jobId: string, jobseekerId: string): Promise<JobApplication | null>
    getJobApplications(jobId: string, status: string): Promise<JobApplication[]>
    changeApplicationStatus(applicationId: string, status: string): Promise<void>
    getAppliedJobsApplications(jobseekerId: string): Promise<JobApplication[]>
    

}
export default IJobApplicationRepository