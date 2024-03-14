import SubscriptionPlan from "../interfaces/entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "../interfaces/serviceInterfaces/IAdminService";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK, NOT_FOUND } = STATUS_CODES

class SubscriptionService{
    constructor(private subscriptionRepository: SubscriptionRepository) { }


    async createPlan(planData: SubscriptionPlan): Promise<AdminResponse>{
        try {
            const planExist = await this.subscriptionRepository.planExists(planData)
            if (!planExist) {
                await this.subscriptionRepository.savePlan(planData)
                return {
                    status: OK,
                    data: {
                        success: true,
                        message:'Plan created successfully'
                    }
                }
            } else {
                return {
                    status: OK,
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
                    status: OK,
                    data: {
                        success: true,
                        message:'Plan updated successfully'
                    }
                }
            } else {
                return {
                    status: NOT_FOUND,
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
                    status: OK,
                    data: {
                        success: true,
                        message:'Plan deleted Successfully'
                    }
                }
            } else {
                return {
                    status: NOT_FOUND,
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