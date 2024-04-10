import { IResponse } from "../common/ICommon";
import Employer from "../entityInterfaces/IEmployer";
import Job from "../entityInterfaces/IJob";


export interface IEmployerService{
  employerLogin(email: string, password: string): Promise<EmployerAuthResponse | undefined>
  googleLogin(email: string, firstName: string, image: string): Promise<EmployerAuthResponse | undefined>
  isEmailExist(email: string): Promise<Employer | null>
  saveEmployer(employerData: Employer): Promise<EmployerAuthResponse>
  resetPassword(email: string, newPassword: string): Promise<boolean>
  getEmployerData(employerId: string): Promise<Employer | null>
  updatePhoneNumber(employerId: string, phoneNumber: string): Promise<IResponse | undefined>
  updateLocation(employerId: string, location: string): Promise<IResponse | undefined>
  updatePhoto(employerId: string, url: string): Promise<IResponse | undefined>
  getPostedJobs(employerId: string): Promise<Job[]>
  
}


export interface EmployerAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      data?:Employer,
      userId?: string;
      token?: string; 
    };
  }