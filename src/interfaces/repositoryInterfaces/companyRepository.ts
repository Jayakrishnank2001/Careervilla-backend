import Company from "../entityInterfaces/company"


interface ICompanyRepository {
    saveCompany(companyData: Company, addressId: string): Promise<Company | null>
    isCompanyExists(companyName: string): Promise<Company | null>
    

}
export default ICompanyRepository