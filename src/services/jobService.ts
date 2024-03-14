import { IJob } from "../interfaces/common/ICommon";
import { IJobRes, IJobService } from "../interfaces/serviceInterfaces/IJobService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import JobRepository from "../repositories/jobRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK } = STATUS_CODES

class JobService implements IJobService{
    constructor(private jobRepository: JobRepository,
        private companyRepository: CompanyRepository,
        private addressRepository: AddressRepository) { }
    
    async saveJob(jobData: IJob): Promise<IJobRes>{
        try {
            const company = await this.companyRepository.isCompanyExists(jobData.companyName)
            const savedAddress = (company) ? await this.addressRepository.saveAddress(jobData.address) : null
            const savedJob = (company && company.id && savedAddress?.id) ? await this.jobRepository.saveJob(jobData, company?.id, savedAddress?.id) : null
            return {
                status: OK,
                data: {
                    success: true,
                    message:'Job created successfully'
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }
}
export default JobService