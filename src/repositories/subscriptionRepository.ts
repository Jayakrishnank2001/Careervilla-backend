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

    async getAllPlans(page: number, limit: number, searchQuery: string): Promise<SubscriptionPlan[]> {
        try {
            if (searchQuery === 'undefined') {
                const result = await SubscriptionPlanModel.find()
                return result as SubscriptionPlan[];
            }
            const regex = new RegExp(searchQuery, 'i');
            const result = await SubscriptionPlanModel.find({
                $or: [
                    { planName: { $regex: regex } },
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .exec();
            return result as SubscriptionPlan[];
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async getPlansCount(searchQuery: string): Promise<number> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            return await SubscriptionPlanModel.find({
                $or: [
                    { planName: { $regex: regex } },
                ]
            }).countDocuments()
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
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