import { SubscriptionPlanInterface } from "../../models/subscriptionPlanModel"
import Employer from "../entityInterfaces/IEmployer"
import Job from "../entityInterfaces/IJob"

interface IEmployerRepository {
    emailExistCheck(email: string): Promise<Employer | null>
    saveEmployer(employer:Employer): Promise<Employer | null>
    updatePassword(email: string, newPassword: string): Promise<boolean>
    showPlans(): Promise<SubscriptionPlanInterface[]>
    updateCompanyId(employerId: string, companyId: string): Promise<Employer | null>
    getEmployerData(employerId: string): Promise<Employer | null>
    updatePlanExpiration(employerId: string, newExpirationDate: Date): Promise<Employer | null>
    updatePhoneNumber(employerId: string, phoneNumber: string): Promise<Employer | null>
    updateLocation(employerId: string, location: string): Promise<Employer | null>
    updatePhoto(employerId: string, url: string): Promise<Employer | null>
    postJob(employerId: string, jobId: string | undefined): Promise<Employer | null>
    getPostedJobs(employerId: string): Promise<Job[]>
    

}

export default IEmployerRepository