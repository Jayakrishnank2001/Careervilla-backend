import Jobseeker from "../entityInterfaces/jobseeker";


interface IJobseekerRepository {
    jobseekerLogin(email: string): Promise<Jobseeker | null>
    emailExistCheck(email: string): Promise<Jobseeker | null>
    saveJobseeker(jobseeker:Jobseeker): Promise<Jobseeker | null>

}

export default IJobseekerRepository