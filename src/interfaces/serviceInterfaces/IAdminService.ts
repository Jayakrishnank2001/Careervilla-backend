import { IApiRes } from "../common/ICommon";
import Employer from "../entityInterfaces/IEmployer";
import Jobseeker from "../entityInterfaces/IJobseeker";

export interface IAdminService{
  adminLogin(username: string, password: string): Promise<AdminAuthResponse>
  getAllEmployers(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IEmployersAndCount | null>>
  getAllJobseekers(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IJobseekersAndCount | null>>
  blockEmployer(employerId: string):void
  blockJobseeker(jobseekerId: string): void

}

export interface AdminAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      adminId?: string;
      token?: string; 
    };
}

export interface IJobseekersAndCount{
  jobseekers: Jobseeker[],
  jobseekersCount:number
}

export interface IEmployersAndCount{
  employers: Employer[],
  employersCount:number
}

export interface AdminResponse{
  status: number,
  data: {
    success: boolean
    message: string
  }
}