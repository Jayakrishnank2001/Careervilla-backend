import { Request, Response } from "express";
import IndustryService from "../services/industryService";
import { STATUS_CODES } from "../constants/httpStatusCodes";

class IndustryController {

    constructor(private industryService: IndustryService) { }

    async getAllIndustries(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string)
            const limit = parseInt(req.query.limit as string)
            const searchQuery = req.query.searchQuery as string | undefined
            const industries = await this.industryService.getAllIndustries(page, limit, searchQuery)
            res.status(industries.status).json(industries)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
        }
    }

    async addIndustry(req: Request, res: Response) {
        try {
            const industryData = req.body
            const newIndustry = await this.industryService.addIndustry(industryData)
            res.status(newIndustry.status).json(newIndustry)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async deleteIndustry(req: Request, res: Response) {
        try {
            const deleteResult = await this.industryService.deleteIndustry(req.params.industryId)
            res.status(deleteResult.status).json(deleteResult)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async updateIndustry(req: Request, res: Response) {
        try {
            const updates = req.body
            const updatedIndustry = await this.industryService.updateIndustry(req.params.industryId, updates)
            res.status(updatedIndustry.status).json(updatedIndustry)
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }



    



}
export default IndustryController