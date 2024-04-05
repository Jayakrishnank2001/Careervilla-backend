import { ICompany, IRes, IResponse } from "../common/ICommon";
import Company from "../entityInterfaces/ICompany";


export interface ICompanyService{
  saveCompany(companyData: ICompany, employerId: string): Promise<ICompanyRes | undefined>
  getCompanyDetails(companyId: string): Promise<Company | null>
  updateCompanyLogo(companyId: string, url: string): Promise<IResponse | undefined>
  updateCompanyDetails(companyData:ICompany,addressId:string,companyId:string): Promise<IResponse | undefined>
  
    
}




export interface ICompanyRes {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  }