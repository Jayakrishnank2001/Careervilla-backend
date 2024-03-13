import { ICompany } from "../interfaces/common/common";
import { ICompanyRes } from "../interfaces/serviceInterfaces/companyService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import EmployerRepository from "../repositories/employerRepository";



class CompanyService {
    constructor(private companyRepository: CompanyRepository,
        private addressRepository: AddressRepository,
        private employerRepository: EmployerRepository) { }

    async saveCompany(companyData: ICompany, employerId: string): Promise<ICompanyRes> {
        try {
            const savedAddress = await this.addressRepository.saveAddress(companyData.address)
            const savedCompany = (savedAddress && savedAddress.id) ? await this.companyRepository.saveCompany(companyData, savedAddress.id) : null
            const updatedEmployer = (savedCompany?.id) ? await this.employerRepository.updateCompanyId(employerId, savedCompany?.id) : null
            return {
                status: 200,
                data: {
                    success: true,
                    message: 'Company saved successfully'
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }


}
export default CompanyService