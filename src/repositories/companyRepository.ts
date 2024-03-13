import Company from "../interfaces/entityInterfaces/company";
import ICompanyRepository from "../interfaces/repositoryInterfaces/companyRepository";
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

}

export default CompanyRepository