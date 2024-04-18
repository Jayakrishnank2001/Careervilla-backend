import { Request, Response } from "express";
import CompanyService from "../services/companyService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { INTERNAL_SERVER_ERROR } = STATUS_CODES


class CompanyController {
    constructor(private companyService: CompanyService) { }

    async saveCompany(req: Request, res: Response) {
        try {
            const companyData = req.body
            const employerId = req.params.employerId
            const newCompany = await this.companyService.saveCompany(companyData, employerId)
            if (newCompany) {
                res.status(newCompany.status).json(newCompany)
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getCompanyDetails(req: Request, res: Response) {
        try {
            const company = await this.companyService.getCompanyDetails(req.params.companyId)
            if (company) {
                res.status(STATUS_CODES.OK).json(company)
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async updateCompanyLogo(req: Request, res: Response) {
        try {
            const company = await this.companyService.updateCompanyLogo(req.body.companyId, req.body.url)
            if (company) {
                res.status(company.status).json(company)
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async updateCompanyDetails(req: Request, res: Response) {
        try {
            const updateCompany = await this.companyService.updateCompanyDetails(req.body.companyData, req.body.companyId, req.body.addressId)
            if (updateCompany) {
                res.status(updateCompany.status).json(updateCompany)
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    async getAllCompanies(req: Request, res: Response) {
        try {
            const companies = await this.companyService.getAllCompanies()
            res.status(STATUS_CODES.OK).json(companies)
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' })
        }
    }

    



}
export default CompanyController