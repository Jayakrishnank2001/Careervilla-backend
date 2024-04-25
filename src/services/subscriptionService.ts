import SubscriptionPlan from "../interfaces/entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "../interfaces/serviceInterfaces/IAdminService";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import { ISubscriptionService } from "../interfaces/serviceInterfaces/ISubscriptionService";
import Stripe from 'stripe';
import dotenv from 'dotenv'
import { paymentToken } from "../interfaces/common/ICommon";
import EmployerRepository from "../repositories/employerRepository";
dotenv.config()

const { OK, NOT_FOUND } = STATUS_CODES

class SubscriptionService implements ISubscriptionService {
    constructor(private subscriptionRepository: SubscriptionRepository, private employerRepository: EmployerRepository) { }

    async createPlan(planData: SubscriptionPlan): Promise<AdminResponse> {
        try {
            const planExist = await this.subscriptionRepository.planExists(planData)
            if (!planExist) {
                await this.subscriptionRepository.savePlan(planData)
                return {
                    status: OK,
                    data: {
                        success: true,
                        message: 'Plan created successfully'
                    }
                }
            } else {
                return {
                    status: OK,
                    data: {
                        success: false,
                        message: 'Plan Already Exists'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse> {
        try {
            const updatedPlan = await this.subscriptionRepository.updatePlan(planId, updates)
            if (updatedPlan) {
                return {
                    status: OK,
                    data: {
                        success: true,
                        message: 'Plan updated successfully'
                    }
                }
            } else {
                return {
                    status: NOT_FOUND,
                    data: {
                        success: false,
                        message: 'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async deletePlan(planId: string): Promise<AdminResponse> {
        try {
            const isDeleted = await this.subscriptionRepository.deletePlan(planId)
            if (isDeleted) {
                return {
                    status: OK,
                    data: {
                        success: true,
                        message: 'Plan deleted Successfully'
                    }
                }
            } else {
                return {
                    status: NOT_FOUND,
                    data: {
                        success: false,
                        message: 'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async getPlans(): Promise<SubscriptionPlan[]> {
        try {
            return this.subscriptionRepository.getAllPlans()
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async makePayment(token: paymentToken, duration: string, planId: string, employerId: string): Promise<boolean> {
        try {
            if (process.env.STRIPE_SECRET_KEY) {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
                const customer = stripe.customers.create({
                    email: token.email,
                    source: token.id
                })

                const charge = stripe.paymentIntents.create({
                    amount: 1000,
                    description: 'Careervilla subscription Payment',
                    currency: 'USD',
                    customer: (await customer).id
                })

            }
            const currentDate = new Date()
            const durationInMonths = parseInt(duration)
            const newExpirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + durationInMonths, currentDate.getDate());
            await this.employerRepository.updatePlanExpiration(employerId, newExpirationDate,planId)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }







}

export default SubscriptionService