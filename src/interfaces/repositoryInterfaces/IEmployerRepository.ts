import { SubscriptionPlanInterface } from "../../models/subscriptionPlanModel"
import Employer from "../entityInterfaces/IEmployer"

interface IEmployerRepository {
    emailExistCheck(email: string): Promise<Employer | null>
    saveEmployer(employer:Employer): Promise<Employer | null>
    updatePassword(email: string, newPassword: string): Promise<boolean>
    showPlans(): Promise<SubscriptionPlanInterface[]>
    updateCompanyId(employerId: string, companyId: string): Promise<Employer | null>
    getEmployerData(employerId: string): Promise<Employer | null>
    updatePlanExpiration(employerId: string, newExpirationDate: Date): Promise<Employer | null>

}

export default IEmployerRepository