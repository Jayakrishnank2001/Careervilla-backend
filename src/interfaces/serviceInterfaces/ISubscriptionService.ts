import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "./IAdminService";
import { IApiRes, paymentToken } from "../common/ICommon";

export interface ISubscriptionService {
    createPlan(planData: SubscriptionPlan): Promise<AdminResponse>
    editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse>
    deletePlan(planId: string): Promise<AdminResponse>
    getAllPlans(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IPlansAndCount | null>>
    makePayment(token: paymentToken, duration: string, planId: string, employerId: string): Promise<boolean>


}


export interface IPlansAndCount{
    plans: SubscriptionPlan[],
    plansCount:number
}