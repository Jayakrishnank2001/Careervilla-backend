import { STATUS_CODES } from "../constants/httpStatusCodes";
import { IApiRes } from "../interfaces/common/ICommon";
import Industry from "../interfaces/entityInterfaces/IIndustry";
import { AdminResponse } from "../interfaces/serviceInterfaces/IAdminService";
import IIndustryService, { IIndustriesAndCount } from "../interfaces/serviceInterfaces/IIndustryService";
import IndustryRepository from "../repositories/industryRepository";


class IndustryService implements IIndustryService {

    constructor(private industryRepository: IndustryRepository) { }

    async getAllIndustries(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IIndustriesAndCount | null>> {
        try {
            if (isNaN(page)) page = 1
            if (isNaN(limit)) limit = 10
            if (!searchQuery) searchQuery = ''
            const industries = await this.industryRepository.getAllIndustries(page, limit, searchQuery)
            const industriesCount = await this.industryRepository.getIndustriesCount(searchQuery)
            return {
                status: STATUS_CODES.OK,
                message: 'success',
                data: { industries, industriesCount }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async addIndustry(industryData: Industry): Promise<AdminResponse> {
        try {
            const industryExist = await this.industryRepository.industryExists(industryData)
            if (!industryExist) {
                await this.industryRepository.saveIndustry(industryData)
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: true,
                        message: 'Industry added successfully'
                    }
                }
            } else {
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: false,
                        message: 'Industry already exists'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async deleteIndustry(industryId: string): Promise<AdminResponse> {
        try {
            const isDeleted = await this.industryRepository.deleteIndustry(industryId)
            if (isDeleted) {
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: true,
                        message: 'Industry deleted Successfully'
                    }
                }
            } else {
                return {
                    status: STATUS_CODES.NOT_FOUND,
                    data: {
                        success: false,
                        message: 'Industry not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async updateIndustry(industryId: string, updates: Partial<Industry>): Promise<AdminResponse> {
        try {
            const updateIndustry = await this.industryRepository.updateIndustry(industryId, updates)
            if (updateIndustry) {
                return {
                    status: STATUS_CODES.OK,
                    data: {
                        success: true,
                        message: 'Industry updated successfully'
                    }
                }
            } else {
                return {
                    status: STATUS_CODES.NOT_FOUND,
                    data: {
                        success: false,
                        message: 'Industry not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }




}
export default IndustryService