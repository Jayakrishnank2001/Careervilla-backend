import SubscriptionPlan from "../interfaces/entityInterfaces/ISubscriptionPlan";
import { AdminResponse } from "../interfaces/serviceInterfaces/IAdminService";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import { IPlansAndCount, ISubscriptionService } from "../interfaces/serviceInterfaces/ISubscriptionService";
import Stripe from 'stripe';
import dotenv from 'dotenv'
import { IApiRes, paymentToken } from "../interfaces/common/ICommon";
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

    async getAllPlans(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IPlansAndCount | null>> {
        try {
            if (isNaN(page)) page = 1
            if (isNaN(limit)) limit = 10
            if (!searchQuery) searchQuery = ''
            const plans = await this.subscriptionRepository.getAllPlans(page, limit, searchQuery)
            const plansCount = await this.subscriptionRepository.getPlansCount(searchQuery)
            return {
                status: STATUS_CODES.OK,
                message: 'success',
                data: { plans, plansCount }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
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