import { IApiRes } from "../common/ICommon"
import Industry from "../entityInterfaces/IIndustry"
import { AdminResponse } from "./IAdminService"

interface IIndustryService {
    getAllIndustries(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IIndustriesAndCount | null>>
    addIndustry(industryData: Industry): Promise<AdminResponse>
    updateIndustry(industryId: string, updates: Partial<Industry>): Promise<AdminResponse>
    deleteIndustry(industryId: string): Promise<AdminResponse>

}
export default IIndustryService


export interface IIndustriesAndCount {
    industries: Industry[],
    industriesCount: number
}