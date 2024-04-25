import { IJob } from "../interfaces/common/ICommon";
import { IJobRes, IJobService } from "../interfaces/serviceInterfaces/IJobService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import JobRepository from "../repositories/jobRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import Job from "../interfaces/entityInterfaces/IJob";
import EmployerRepository from "../repositories/employerRepository";
import { ObjectId } from "mongoose";

const { OK } = STATUS_CODES

class JobService implements IJobService {
    constructor(private jobRepository: JobRepository,
        private companyRepository: CompanyRepository,
        private addressRepository: AddressRepository,
        private employerRepository: EmployerRepository) { }

    async saveJob(jobData: IJob, employerId: string): Promise<IJobRes> {
        try {
            const company = await this.companyRepository.isCompanyExists(jobData.companyName)
            const savedAddress = (company) ? await this.addressRepository.saveAddress(jobData) : null
            const savedJob = (company && company.id && savedAddress?.id) ? await this.jobRepository.saveJob(jobData, company.id, savedAddress.id, employerId) : null
            await this.employerRepository.postJob(employerId, savedJob?.id)
            return {
                status: OK,
                data: {
                    success: true,
                    message: 'Job created successfully'
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllJobs(page:number,pageSize:number,companyId:string): Promise<Job[]> {
        try {
            return await this.jobRepository.getAllJobs(page,pageSize,companyId)
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async getJobDetails(jobId: string): Promise<Job | null> {
        try {
            const job = await this.jobRepository.findJobById(jobId as unknown as ObjectId)
            return job
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async updateJob(jobData: IJob, jobId: string, addressId: string): Promise<IJobRes> {
        try {
            const address = await this.addressRepository.updateAddress(addressId, jobData)
            const job = await this.jobRepository.updateJob(jobData, jobId)
            return {
                status: STATUS_CODES.OK,
                data: {
                    success: true,
                    message: 'Job updated successfully'
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async updateJobStatus(jobId: string): Promise<IJobRes> {
        try {
            await this.jobRepository.updateJobStatus(jobId)
            return {
                status: STATUS_CODES.OK,
                data: {
                    success: true,
                    message:'Status Updated'
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }





}
export default JobService