import { IResponse } from "../common/ICommon";
import Jobseeker from "../entityInterfaces/IJobseeker";


export interface IJobseekerService{
  jobseekerLogin(email: string, password: string): Promise<JobseekerAuthResponse | undefined>
  googleLogin(email: string, firstName: string, image: string): Promise< JobseekerAuthResponse | undefined>
  isEmailExist(email: string): Promise<Jobseeker | null>
  saveJobseeker(jobseekerData: Jobseeker): Promise<JobseekerAuthResponse>
  resetPassword(email: string, newPassword: string): Promise<boolean>
  getJobseekerData(jobseekerId: string): Promise<Jobseeker | null>
  updatePhoneNumber(jobseekerId: string, phoneNumber: string): Promise<IResponse | undefined>
  updateLocation(jobseekerId: string, location: string): Promise<IResponse | undefined>
  updatePhoto(jobseekerId: string, url: string): Promise<IResponse | undefined>
  addResume(jobseekerId: string, url: string): Promise<IResponse | undefined>
  deleteResume(jobseekerId: string): Promise<IResponse | undefined>
  saveJob(jobseekerId: string, jobId: string): Promise<IResponse | undefined>
  

}


export interface JobseekerAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      data?:Jobseeker,
      userId?: string;
      token?: string; 
    };
  }