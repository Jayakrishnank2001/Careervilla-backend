import { ICompany } from "../common/ICommon";


export interface ICompanyService{
  saveCompany(companyData: ICompany, employerId: string):Promise<ICompanyRes>
}




export interface ICompanyRes {
    status: number;
    data: {
      success: boolean;
      message: string;
    };
  }