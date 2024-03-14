import { Request, Response } from "express";
import CompanyService from "../services/companyService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { INTERNAL_SERVER_ERROR } = STATUS_CODES


class CompanyController{
    constructor(private companyService: CompanyService) { }
    
    async saveCompany(req: Request, res: Response) {
        try {
            const companyData = req.body
            const employerId=req.params.employerId
            const newCompany = await this.companyService.saveCompany(companyData,employerId)
            res.status(newCompany.status).json(newCompany)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }



}
export default CompanyController