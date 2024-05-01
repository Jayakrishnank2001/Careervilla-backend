import Industry from "../entityInterfaces/IIndustry"


interface IIndustryRepository {
    getAllIndustries(page: number, limit: number, searchQuery: string): Promise<Industry[]>
    getIndustriesCount(searchQuery: string): Promise<number>
    industryExists(industry: Industry): Promise<boolean>
    saveIndustry(industry: Industry): Promise<Industry | null>
    updateIndustry(industryId: string, updates: Partial<Industry>): Promise<Industry | null>
    deleteIndustry(industryId: string): Promise<boolean>
    
}
export default IIndustryRepository