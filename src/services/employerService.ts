import Employer from "../interfaces/entityInterfaces/IEmployer";
import EmployerRepository from "../repositories/employerRepository";
import { EmployerAuthResponse, IEmployerService } from "../interfaces/serviceInterfaces/IEmployerService";
import Encrypt from "../utils/hashPassword";
import { createJWT } from "../utils/jwtUtils";
import { STATUS_CODES } from '../constants/httpStatusCodes';
import { IResponse } from "../interfaces/common/ICommon";
import Job from "../interfaces/entityInterfaces/IJob";

const { UNAUTHORIZED, OK } = STATUS_CODES


class EmployerService implements IEmployerService {
  constructor(
    private employerRepository: EmployerRepository,
    private createJWT: createJWT,
    private encrypt: Encrypt
  ) { }

  async employerLogin(email: string, password: string): Promise<EmployerAuthResponse | undefined> {
    try {
      const employer = await this.employerRepository.emailExistCheck(email);
      if (employer) {
        if (employer.isBlocked) {
          return {
            status: UNAUTHORIZED,
            data: {
              success: false,
              message: "You have been blocked",
            },
          };
        }
        if (employer.password && password) {
          const passwordMatch = await this.encrypt.compare(
            password,
            employer.password
          );
          if (passwordMatch) {
            const token = this.createJWT.generateToken({
              id: employer.id,
              email: employer.email,
              role: 'employer'
            });
            return {
              status: OK,
              data: {
                success: true,
                message: "Authentication successful",
                data:employer,
                userId: employer.id,
                token: token,
              },
            } as const;
          } else {
            return {
              status: UNAUTHORIZED,
              data: {
                success: false,
                message: "Authentication failed",
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

  async isEmailExist(email: string): Promise<Employer | null> {
    try {
      const isEmployerExist = await this.employerRepository.emailExistCheck(email)
      return isEmployerExist
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async saveEmployer(employerData: Employer): Promise<EmployerAuthResponse> {
    try {
      let hashPassword
      if (employerData.password) {
        hashPassword = await this.encrypt.createHash(employerData.password)
      }
      employerData.password = hashPassword
      const employer = await this.employerRepository.saveEmployer(employerData)
      return {
        status: OK,
        data: {
          success: true,
          message: 'Success',
          userId: employer?.id
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const hashedPassword = await this.encrypt.createHash(newPassword)
      return this.employerRepository.updatePassword(email, hashedPassword)
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async googleLogin(email: string, firstName: string, image: string): Promise<EmployerAuthResponse | undefined> {
    try {
      const employer = await this.employerRepository.emailExistCheck(email)
      if (!employer) {
        const data = { email, firstName, image }
        const newEmployer = await this.employerRepository.saveEmployer(data)
        if (newEmployer) {
          const token = this.createJWT.generateToken({
            id: newEmployer.id,
            email: newEmployer.email,
            role: 'employer'
          });
          return {
            status: OK,
            data: {
              success: true,
              message: "Authentication successful",
              data:newEmployer,
              userId: newEmployer.id,
              token: token,
            },
          };
        }
      } else if (employer.isBlocked) {
        return {
          status: UNAUTHORIZED,
          data: {
            success: false,
            message: "You have been blocked",
          },
        };
      }
      else {
        const token = this.createJWT.generateToken({
          id: employer.id,
          email: employer.email,
          role: 'employer'
        });
        return {
          status: OK,
          data: {
            success: true,
            message: "Authentication successful",
            data:employer,
            userId: employer.id,
            token: token,
          },
        };
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async getEmployerData(employerId: string): Promise<Employer | null> {
    try {
      const employer = await this.employerRepository.getEmployerData(employerId)
      return employer
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async updatePhoneNumber(employerId: string, phoneNumber: string): Promise<IResponse | undefined> {
    try {
      const employer = await this.employerRepository.updatePhoneNumber(employerId, phoneNumber)
      if (employer) {
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

  async updateLocation(employerId: string, location: string): Promise<IResponse | undefined> {
    try {
      const employer = await this.employerRepository.updateLocation(employerId, location)
      if (employer) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Location Updated successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async updatePhoto(employerId: string, url: string): Promise<IResponse | undefined> {
    try {
      const employer = await this.employerRepository.updatePhoto(employerId, url)
      if (employer) {
        return {
          status: STATUS_CODES.OK,
          data: {
            success: true,
            message:'Profile Photo updated successfully'
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async getPostedJobs(employerId: string): Promise<Job[]> {
    try {
      const postedJobs = await this.employerRepository.getPostedJobs(employerId)
      return postedJobs
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }









}

export default EmployerService;
