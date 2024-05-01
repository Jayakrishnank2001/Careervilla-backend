import { Request, Response } from "express";
import SubscriptionService from "../services/subscriptionService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = STATUS_CODES

class SubscriptionController {

    constructor(private subscriptionService: SubscriptionService) { }

    async createPlan(req: Request, res: Response) {
        try {
            const planData = req.body
            const newPlan = await this.subscriptionService.createPlan(planData.data)
            res.status(newPlan.status).json(newPlan)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async editPlan(req: Request, res: Response) {
        try {
            const { planId } = req.params
            const updates = req.body
            const updatedPlan = await this.subscriptionService.editPlan(planId, updates.data)
            res.status(updatedPlan.status).json(updatedPlan)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async deletePlan(req: Request, res: Response) {
        try {
            const { planId } = req.params
            const deleteResult = await this.subscriptionService.deletePlan(planId)
            res.status(deleteResult.status).json(deleteResult)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getPlans(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string)
            const limit = parseInt(req.query.limit as string)
            const searchQuery = req.query.searchQuery as string | undefined
            const plans = await this.subscriptionService.getAllPlans(page, limit, searchQuery)
            res.status(OK).json(plans)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async makePayment(req: Request, res: Response) {
        try {
            const { stripeToken, duration, planId } = req.body
            const employerId = req.params.employerId
            const success = await this.subscriptionService.makePayment(stripeToken, duration, planId, employerId)
            if (success) {
                res.status(OK).json({ data: 'success' })
            } else {
                res.status(BAD_REQUEST).json({ data: 'failure' })
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }





}
export default SubscriptionController