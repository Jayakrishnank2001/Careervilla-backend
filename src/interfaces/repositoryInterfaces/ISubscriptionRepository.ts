import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan"


interface ISubscriptionRepository{
  savePlan(plan: SubscriptionPlan): Promise<SubscriptionPlan | null>
  updatePlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null>
  deletePlan(planId: string): Promise<boolean>
  getAllPlans(): Promise<SubscriptionPlan[]>
  planExists(plan:SubscriptionPlan):Promise<boolean>
}

export default ISubscriptionRepository