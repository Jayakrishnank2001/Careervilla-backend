import JobApplication from "../entityInterfaces/IJobApplication"

interface IJobApplicationRepository{
    applyJob(data: JobApplication): Promise<JobApplication | null>
    withdrawJobApplication(jobId: string, jobseekerId: string): Promise<JobApplication | null>

}
export default IJobApplicationRepository