import { ICompany } from "../interfaces/common/ICommon";
import { ICompanyRes } from "../interfaces/serviceInterfaces/ICompanyService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import EmployerRepository from "../repositories/employerRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK } = STATUS_CODES

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
                status: OK,
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