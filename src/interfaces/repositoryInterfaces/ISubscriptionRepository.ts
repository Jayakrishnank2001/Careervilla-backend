import SubscriptionPlan from "../entityInterfaces/ISubscriptionPlan"


interface ISubscriptionRepository{
  savePlan(plan: SubscriptionPlan): Promise<SubscriptionPlan | null>
  updatePlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null>
  deletePlan(planId: string): Promise<boolean>
  getAllPlans(page: number, limit: number, searchQuery: string): Promise<SubscriptionPlan[]>
  getPlansCount(searchQuery: string): Promise<number>
  planExists(plan:SubscriptionPlan):Promise<boolean>
}

export default ISubscriptionRepository