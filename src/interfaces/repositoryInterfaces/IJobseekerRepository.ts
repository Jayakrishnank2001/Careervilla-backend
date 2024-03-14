import Jobseeker from "../entityInterfaces/IJobseeker";


interface IJobseekerRepository {
    emailExistCheck(email: string): Promise<Jobseeker | null>
    saveJobseeker(jobseeker: Jobseeker): Promise<Jobseeker | null>
    updatePassword(email:string,newPassword:string): Promise<boolean>

}

export default IJobseekerRepository