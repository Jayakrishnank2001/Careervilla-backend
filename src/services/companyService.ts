import { ICompany, IResponse } from "../interfaces/common/ICommon";
import { ICompanyRes, ICompanyService } from "../interfaces/serviceInterfaces/ICompanyService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import EmployerRepository from "../repositories/employerRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import Company from "../interfaces/entityInterfaces/ICompany";

const { OK } = STATUS_CODES

class CompanyService implements ICompanyService {
    constructor(private companyRepository: CompanyRepository,
        private addressRepository: AddressRepository,
        private employerRepository: EmployerRepository) { }

    async saveCompany(companyData: ICompany, employerId: string): Promise<ICompanyRes | undefined> {
        try {
            const savedAddress = await this.addressRepository.saveAddress(companyData)
            const savedCompany = (savedAddress && savedAddress.id) ? await this.companyRepository.saveCompany(companyData, savedAddress.id) : null
            const updatedEmployer = (savedCompany?.id) ? await this.employerRepository.updateCompanyId(employerId, savedCompany?.id) : null
            if (updatedEmployer) {
                return {
                    status: OK,
                    data: {
                        success: true,
                        message: 'Company saved successfully'
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getCompanyDetails(companyId: string): Promise<Company | null> {
        try {
            const company = await this.companyRepository.getCompanyDetails(companyId)
            return company
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async updateCompanyLogo(companyId: string, url: string): Promise<IResponse | undefined> {
        try {
            const company = await this.companyRepository.updateCompanyLogo(companyId, url)
            if (company) {
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: true,
                        message: 'Logo updated successfully'
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async updateCompanyDetails(companyData: ICompany, companyId: string, addressId: string): Promise<IResponse | undefined> {
        try {
            const updateAddress = await this.addressRepository.updateAddress(addressId, companyData)
            const updateCompany = await this.companyRepository.updateCompanyDetails(companyData, companyId)
            if (updateAddress && updateCompany) {
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: true,
                        message:'Company details updated'
                    }
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllCompanies(): Promise<Company[]> {
        try {
            return await this.companyRepository.getAllCompanies()
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }


}
export default CompanyService