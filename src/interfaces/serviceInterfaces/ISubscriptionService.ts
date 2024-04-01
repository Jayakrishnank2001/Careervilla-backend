import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "./IAdminService";
import { paymentToken } from "../common/ICommon";

export interface ISubscriptionService{
    createPlan(planData: SubscriptionPlan): Promise<AdminResponse>
    editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse>
    deletePlan(planId: string): Promise<AdminResponse>
    getPlans(): Promise<SubscriptionPlan[]>
    makePayment(token: paymentToken,duration:string,employerId:string): Promise<boolean>
    

}