import JobseekerRepository from "../repositories/jobseekerRepository";
import { createJWT } from "../utils/jwtUtils";
import Encrypt from "../utils/hashPassword";
import { IJobseekerService, JobseekerAuthResponse } from "../interfaces/serviceInterfaces/IJobseekerService";
import Jobseeker from "../interfaces/entityInterfaces/IJobseeker";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import { IRes, IResponse } from "../interfaces/common/ICommon";
import Job from "../interfaces/entityInterfaces/IJob";
import { ObjectId } from "mongoose";
import JobApplicationRepository from "../repositories/jobApplicationRepository";

const { UNAUTHORIZED, OK } = STATUS_CODES


class JobseekerService implements IJobseekerService {
  constructor(
    private jobseekerRepository: JobseekerRepository,
    private createJWT: createJWT,
    private encrypt: Encrypt,
    private jobApplicationRepository:JobApplicationRepository,
  ) { }

  async jobseekerLogin(email: string, password: string): Promise<JobseekerAuthResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.emailExistCheck(email);
      if (jobseeker) {
        if (jobseeker.isBlocked) {
          return {
            status: UNAUTHORIZED,
            data: {
              success: false,
              message: "You have been blocked",
            },
          };
        }
        if (jobseeker.password && password) {
          const passwordMatch = await this.encrypt.compare(
            password,
            jobseeker.password
          );
          if (passwordMatch) {
            const token = this.createJWT.generateToken({
              id: jobseeker.id,
              email: jobseeker.email,
              role: 'jobseeker'
            });
            return {
              status: OK,
              data: {
                success: true,
                message: "Authentication successful",
                data:jobseeker,
                userId: jobseeker.id,
                token: token,
              },
            } as const;
          } else {
            return {
              status: UNAUTHORIZED,
              data: {
                success: false,
                message: "Authentication failed.",
              },
            } as const;
          }
        }
      } else {
        return {
          status: UNAUTHORIZED,
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

  async isEmailExist(email: string): Promise<Jobseeker | null> {
    try {
      const isJobseekerExist = await this.jobseekerRepository.emailExistCheck(email)
      return isJobseekerExist
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async saveJobseeker(jobseekerData: Jobseeker): Promise<JobseekerAuthResponse> {
    try {
      let hashPassword
      if (jobseekerData.password) {
        hashPassword = await this.encrypt.createHash(jobseekerData.password)
      }
      jobseekerData.password = hashPassword
      const jobseeker = await this.jobseekerRepository.saveJobseeker(jobseekerData)
      return {
        status: OK,
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

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = await this.encrypt.createHash(newPassword)
      return this.jobseekerRepository.updatePassword(email, hashedPassword)
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async googleLogin(email: string, firstName: string, image: string): Promise<JobseekerAuthResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.emailExistCheck(email)
      if (!jobseeker) {
        const data = { email, firstName, image }
        const newJobseeker = await this.jobseekerRepository.saveJobseeker(data)
        if (newJobseeker) {
          const token = this.createJWT.generateToken({
            id: newJobseeker.id,
            email: newJobseeker.email,
            role: 'employer'
          });
          return {
            status: OK,
            data: {
              success: true,
              message: "Authentication successful",
              data: newJobseeker,
              userId: newJobseeker.id,
              token: token,
            },
          };
        }
      } else if (jobseeker.isBlocked) {
        return {
          status: UNAUTHORIZED,
          data: {
            success: false,
            message: "You have been blocked",
          },
        };
      } else {
        const token = this.createJWT.generateToken({
          id: jobseeker.id,
          email: jobseeker.email,
          role: 'employer'
        });
        return {
          status: OK,
          data: {
            success: true,
            message: "Authentication successful",
            data:jobseeker,
            userId: jobseeker.id,
            token: token,
          },
        };
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async getJobseekerData(jobseekerId: string): Promise<Jobseeker | null> {
    try {
      const jobseeker = await this.jobseekerRepository.getJobseekerData(jobseekerId)
      return jobseeker
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async updatePhoneNumber(jobseekerId: string, phoneNumber: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.updatePhoneNumber(jobseekerId, phoneNumber)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Phone Number Updated Successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async updateLocation(jobseekerId: string, location: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.updateLocation(jobseekerId, location)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Location Updated Successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async updatePhoto(jobseekerId: string, url: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.updatePhoto(jobseekerId, url)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Profile Photo Updated Successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addResume(jobseekerId: string, url: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.addResume(jobseekerId, url)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Resume added successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async deleteResume(jobseekerId: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.deleteResume(jobseekerId)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Resume deleted successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async saveJob(jobseekerId: string, jobId: string): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.saveJob(jobseekerId, jobId)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Job saved successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async unsaveJob(jobseekerId: ObjectId, jobId: ObjectId): Promise<IResponse | undefined> {
    try {
      const jobseeker = await this.jobseekerRepository.unsaveJob(jobseekerId, jobId)
      if (jobseeker) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Job unsaved successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async getSavedJobs(jobseekerId: string): Promise<Job[]> {
    try {
      const savedJobs = await this.jobseekerRepository.getSavedJobs(jobseekerId)
      return savedJobs
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async withdrawApplication(jobId: string, jobseekerId: string): Promise<IResponse | undefined> {
    try {
      await this.jobseekerRepository.withdrawApplication(jobId, jobseekerId)
      await this.jobApplicationRepository.withdrawJobApplication(jobId, jobseekerId)
      return {
        status: STATUS_CODES.OK,
        data: {
          success: true,
          message:'Job Application Withdrawn'
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addRecentWork(work: string, jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addRecentWork(work, jobseekerId)
      return {
        success: true,
        message:'work experience added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addEducation(education: string, jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addEducation(education, jobseekerId)
      return {
        success: true,
        message:'education added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addSalary(salary: string, jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addSalary(salary, jobseekerId)
      return {
        success: true,
        message:'minimum salary added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addJobTypes(jobTypes: [string], jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addJobTypes(jobTypes, jobseekerId)
      return {
        success: true,
        message:'Job Types added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addSkills(skills: string[], jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addSkills(skills, jobseekerId)
      return {
        success: true,
        message:'skills added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addLanguages(languages: string[], jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addLanguages(languages, jobseekerId)
      return {
        success: true,
        message:'languages added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async addJobTitles(jobTitles: string[], jobseekerId: string): Promise<IRes> {
    try {
      await this.jobseekerRepository.addJobTitles(jobTitles, jobseekerId)
      return {
        success: true,
        message:'Job Titles added'
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }


  



}

export default JobseekerService;
