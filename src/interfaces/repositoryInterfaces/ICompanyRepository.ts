import Company from "../entityInterfaces/ICompany"


interface ICompanyRepository {
    saveCompany(companyData: Company, addressId: string): Promise<Company | null>
    isCompanyExists(companyName: string): Promise<Company | null>
    getCompanyDetails(companyId: string): Promise<Company | null>
    updateCompanyLogo(companyId: string, url: string): Promise<Company | null>
    updateCompanyDetails(companyData:Company, companyId: string): Promise<Company | null>

}
export default ICompanyRepository