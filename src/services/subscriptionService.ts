import SubscriptionPlan from "../interfaces/entityInterfaces/subscriptionPlan";
import { AdminResponse } from "../interfaces/serviceInterfaces/adminService";
import SubscriptionRepository from "../repositories/subscriptionRepository";




class SubscriptionService{
    constructor(private subscriptionRepository: SubscriptionRepository) { }


    async createPlan(planData: SubscriptionPlan): Promise<AdminResponse>{
        try {
            const planExist = await this.subscriptionRepository.planExists(planData)
            if (!planExist) {
                const newPlan = await this.subscriptionRepository.savePlan(planData)
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan created successfully'
                    }
                }
            } else {
                return {
                    status: 200,
                    data: {
                        success: false,
                        message:'Plan Already Exists'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse>{
        try {
            const updatedPlan = await this.subscriptionRepository.updatePlan(planId, updates)
            if (updatedPlan) {
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan updated successfully'
                    }
                }
            } else {
                return {
                    status: 404,
                    data: {
                        success: false,
                        message:'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async deletePlan(planId: string): Promise<AdminResponse>{
        try {
            const isDeleted = await this.subscriptionRepository.deletePlan(planId)
            if (isDeleted) {
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan deleted Successfully'
                    }
                }
            } else {
                return {
                    status: 404,
                    data: {
                        success: false,
                        message:'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async getPlans(): Promise<SubscriptionPlan[]>{
        try {
            return this.subscriptionRepository.getAllPlans()
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    





}

export default SubscriptionService