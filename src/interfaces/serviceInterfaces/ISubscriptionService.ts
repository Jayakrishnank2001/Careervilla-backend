import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "./IAdminService";

export interface ISubscriptionService{
    createPlan(planData: SubscriptionPlan): Promise<AdminResponse>
    editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse>
    deletePlan(planId: string): Promise<AdminResponse>
    getPlans(): Promise<SubscriptionPlan[]>
    
}