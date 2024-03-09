import Employer from "../entityInterfaces/employer";
import Jobseeker from "../entityInterfaces/jobseeker";

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