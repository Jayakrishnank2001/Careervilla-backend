import { Request, Response } from "express";
import SubscriptionService from "../services/subscriptionService";




class SubscriptionController {

    constructor(private subscriptionService: SubscriptionService) { }

    async createPlan(req: Request, res: Response) {
        try {
            const planData = req.body
            const newPlan = await this.subscriptionService.createPlan(planData.data)
            res.status(newPlan.status).json(newPlan)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
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
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async deletePlan(req: Request, res: Response) {
        try {
            const { planId } = req.params
            const deleteResult = await this.subscriptionService.deletePlan(planId)
            res.status(deleteResult.status).json(deleteResult)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }

    async getPlans(req: Request, res: Response) {
        try {
            const plans = await this.subscriptionService.getPlans()
            res.status(200).json(plans)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' })
        }
    }





}
export default SubscriptionController