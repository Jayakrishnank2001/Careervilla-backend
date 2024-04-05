import JobApplication from "../entityInterfaces/IJobApplication"

interface IJobApplicationRepository{
    applyJob(data:JobApplication): Promise<JobApplication | null>

}
export default IJobApplicationRepository