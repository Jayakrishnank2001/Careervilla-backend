import JobseekerRepository from "../repositories/jobseekerRepository";
import { createJWT } from "../utils/jwtUtils";
import Encrypt from "../utils/hashPassword";
import { JobseekerAuthResponse } from "../interfaces/serviceInterfaces/jobseekerService";
import Jobseeker from "../interfaces/entityInterfaces/jobseeker";

class JobseekerService {
  constructor(
    private jobseekerRepository: JobseekerRepository,
    private createJWT: createJWT,
    private encrypt: Encrypt
  ) { }

  async jobseekerLogin(user: any): Promise<JobseekerAuthResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.emailExistCheck(
        user.email
      );
      if (jobseeker) {
        if (jobseeker.isBlocked) {
          return {
            status: 401,
            data: {
              success: false,
              message: "You have been blocked",
            },
          };
        }
        if (jobseeker.password && user.password) {
          const passwordMatch = await this.encrypt.compare(
            user.password,
            jobseeker.password
          );
          if (passwordMatch) {
            const token = this.createJWT.generateToken({
              id: jobseeker.id,
              email: jobseeker.email,
              role: 'jobseeker'
            });
            return {
              status: 200,
              data: {
                success: true,
                message: "Authentication successful",
                userId: jobseeker.id,
                token: token,
              },
            } as const;
          } else {
            return {
              status: 401,
              data: {
                success: false,
                message: "Authentication failed.",
              },
            } as const;
          }
        }
      } else {
        return {
          status: 401,
          data: {
            success: false,
            message: "Authentication failed",
          },
        } as const;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async isEmailExist(email: string): Promise<Jobseeker | null>{
    try {
      const isJobseekerExist = await this.jobseekerRepository.emailExistCheck(email)
      return isJobseekerExist
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async saveJobseeker(jobseekerData: Jobseeker): Promise<JobseekerAuthResponse>{
    try {
      const hashPassword = await this.encrypt.createHash(jobseekerData.password)
      jobseekerData.password=hashPassword
      const jobseeker = await this.jobseekerRepository.saveJobseeker(jobseekerData)
      return {
        status: 200,
        data: {
          success: true,
          message: 'Success',
          userId: jobseeker?.id
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean>{
    try {
      const hashedPassword = await this.encrypt.createHash(newPassword)
      return this.jobseekerRepository.updatePassword(email,hashedPassword)
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }




}

export default JobseekerService;
