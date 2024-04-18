import Company from "../interfaces/entityInterfaces/ICompany";
import ICompanyRepository from "../interfaces/repositoryInterfaces/ICompanyRepository";
import CompanyModel from "../models/companyModel";

class CompanyRepository implements ICompanyRepository{

    async saveCompany(companyData: Company,addressId:string): Promise<Company | null> {
        try {
            const newCompany = new CompanyModel({
                addressId: addressId,
                ...companyData
            })
            const savedCompany = await newCompany.save()
            return savedCompany
        } catch (error) {
            console.error(Error)
            return null
        }
    }

    async isCompanyExists(companyName: string): Promise<Company | null> {
        try {
            const company = await CompanyModel.findOne({ companyName: companyName })
            return company as Company
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getCompanyDetails(companyId: string): Promise<Company | null> {
        try {
            const company = await CompanyModel.findById(companyId).populate('addressId')
            return company
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateCompanyLogo(companyId: string, url: string): Promise<Company | null> {
        try {
            const company = await CompanyModel.findByIdAndUpdate(companyId, { logo: url }, { new: true })
            return company
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateCompanyDetails(companyData:Company, companyId: string): Promise<Company | null> {
        try {
            const company = await CompanyModel.findByIdAndUpdate(companyId, { ...companyData }, { new: true })
            return company
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllCompanies(): Promise<Company[]> {
        try {
            const companies = await CompanyModel.find().populate('addressId')
            return companies.map((company) => company.toObject())
        } catch (error) {
            console.error(error)
            return []
        }
    }

}

export default CompanyRepository