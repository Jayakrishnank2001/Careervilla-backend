import { IJob } from "../interfaces/common/ICommon";
import { IJobRes, IJobService } from "../interfaces/serviceInterfaces/IJobService";
import AddressRepository from "../repositories/addressRepository";
import CompanyRepository from "../repositories/companyRepository";
import JobRepository from "../repositories/jobRepository";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import Job, { searchQuery } from "../interfaces/entityInterfaces/IJob";
import EmployerRepository from "../repositories/employerRepository";
import { ObjectId } from "mongoose";
import IndustryRepository from "../repositories/industryRepository";
import JobseekerRepository from "../repositories/jobseekerRepository";

const { OK } = STATUS_CODES

class JobService implements IJobService {
    constructor(private jobRepository: JobRepository,
        private companyRepository: CompanyRepository,
        private addressRepository: AddressRepository,
        private employerRepository: EmployerRepository,
        private industryRepository: IndustryRepository,
        private jobseekerRepository: JobseekerRepository) { }

    async saveJob(jobData: IJob, employerId: string): Promise<IJobRes> {
        try {
            const company = await this.companyRepository.isCompanyExists(jobData.companyName)
            const savedAddress = (company) ? await this.addressRepository.saveAddress(jobData) : null
            const industry=await this.industryRepository.industryExists(jobData.industryName)
            const savedJob = (company && company.id && savedAddress?.id && industry) ? await this.jobRepository.saveJob(jobData, company.id, savedAddress.id, employerId,industry.id) : null
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

    async getAllJobs(page: number, pageSize: number, companyId: string, searchQuery: searchQuery,jobseekerId:string): Promise<Job[]> {
        try {
            if (!searchQuery.jobTitle) searchQuery.jobTitle = ''
            if (!searchQuery.location) searchQuery.location = ''
            if (!searchQuery.experience) searchQuery.experience = ''
            if (!searchQuery.industryName) searchQuery.industryName = ''
            if (!searchQuery.jobType) searchQuery.jobType = ''
            const jobs = await this.jobRepository.getAllJobs(companyId, searchQuery)
            if (companyId != 'undefined') {
                return jobs
            } else {
                return await this.jobseekerRepository.getPreferencedJobs(jobseekerId,jobs,page,pageSize)
            }
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
            const industry = await this.industryRepository.industryExists(jobData.industryName)
            await this.addressRepository.updateAddress(addressId, jobData)
            if (industry) {
                await this.jobRepository.updateJob(jobData, jobId,industry.id)
            }
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
                    message: 'Status Updated'
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }





}
export default JobService