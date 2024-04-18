import SubscriptionPlan from "../interfaces/entityInterfaces/ISubscriptionPlan";
import ISubscriptionRepository from "../interfaces/repositoryInterfaces/ISubscriptionRepository";
import SubscriptionPlanModel from "../models/subscriptionPlanModel";


class SubscriptionRepository implements ISubscriptionRepository{
    
    async savePlan(plan: SubscriptionPlan): Promise<SubscriptionPlan | null> {
        try {
            const newPlan = new SubscriptionPlanModel(plan)
            await newPlan.save()
            return newPlan as SubscriptionPlan
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatePlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<SubscriptionPlan | null> {
        try {
            const updatedPlan = await SubscriptionPlanModel.findByIdAndUpdate(planId, updates, { new: true })
            return updatedPlan
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deletePlan(planId: string): Promise<boolean> {
        try {
            const result = await SubscriptionPlanModel.findByIdAndDelete(planId)
            return !!result
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async getAllPlans(): Promise<SubscriptionPlan[]> {
        try {
            const plans = await SubscriptionPlanModel.find().exec()
            return plans.map((plan) => plan.toObject())
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async planExists(planData: SubscriptionPlan): Promise<boolean> {
        try {
            let existingPlan
            const normalizedPlanName = planData.planName?.trim().toLowerCase();
            if (normalizedPlanName) {
                existingPlan = await SubscriptionPlanModel.findOne({
                    planName: { $regex: new RegExp(`^${normalizedPlanName}$`, 'i') },
                });
            }
            return !!existingPlan
        } catch (error) {
            console.error(error)
            return false
        }
    }







}

export default SubscriptionRepository