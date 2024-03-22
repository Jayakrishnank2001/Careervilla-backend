import Jobseeker from "../entityInterfaces/IJobseeker";


export interface IJobseekerService{
  jobseekerLogin(email: string, password: string): Promise<JobseekerAuthResponse | undefined>
  googleLogin(email: string, firstName: string, image: string): Promise< JobseekerAuthResponse | undefined>
  isEmailExist(email: string): Promise<Jobseeker | null>
  saveJobseeker(jobseekerData: Jobseeker): Promise<JobseekerAuthResponse>
  resetPassword(email: string, newPassword: string): Promise<boolean>
  getJobseekerData(jobseekerId: string): Promise<Jobseeker | null>
  
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