import { Request, Response } from "express";
import CompanyService from "../services/companyService";



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
            res.status(500).json({ error: 'Internal server error' })
        }
    }



}
export default CompanyController