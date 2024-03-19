import Employer from "../entityInterfaces/IEmployer";


export interface IEmployerService{
  employerLogin(email: string, password: string): Promise<EmployerAuthResponse | undefined>
  googleLogin(email: string, firstName: string, image: string): Promise<EmployerAuthResponse | undefined>
  isEmailExist(email: string): Promise<Employer | null>
  saveEmployer(employerData: Employer): Promise<EmployerAuthResponse>
  resetPassword(email: string, newPassword: string): Promise<boolean>
  getEmployerData(employerId:string):Promise<Employer | null>

}


export interface EmployerAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      userId?: string;
      token?: string; 
    };
  }