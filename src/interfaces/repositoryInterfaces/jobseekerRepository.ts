import Jobseeker from "../entityInterfaces/jobseeker";


interface IJobseekerRepository {
    emailExistCheck(email: string): Promise<Jobseeker | null>
    saveJobseeker(jobseeker: Jobseeker): Promise<Jobseeker | null>
    updatePassword(email:string,newPassword:string): Promise<boolean>

}

export default IJobseekerRepository