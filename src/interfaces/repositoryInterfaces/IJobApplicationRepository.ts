import JobApplication from "../entityInterfaces/IJobApplication"

interface IJobApplicationRepository{
    applyJob(resume: string, jobId: string, jobseekerId: string): Promise<JobApplication | null>

}
export default IJobApplicationRepository