import { SubscriptionPlanInterface } from "../../models/subscriptionPlanModel"
import Employer from "../entityInterfaces/employer"

interface IEmployerRepository {
    emailExistCheck(email: string): Promise<Employer | null>
    saveEmployer(employer:Employer): Promise<Employer | null>
    updatePassword(email: string, newPassword: string): Promise<boolean>
    showPlans():Promise<SubscriptionPlanInterface[]>

}

export default IEmployerRepository