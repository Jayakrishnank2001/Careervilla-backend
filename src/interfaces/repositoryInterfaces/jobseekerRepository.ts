import Jobseeker from "../entityInterfaces/jobseeker";


interface IJobseekerRepository {
    jobseekerLogin(email: string): Promise<Jobseeker | null>

}

export default IJobseekerRepository