import Employer from "../interfaces/entityInterfaces/employer";
import EmployerRepository from "../repositories/employerRepository";
import { EmployerAuthResponse } from "../interfaces/serviceInterfaces/employerService";
import Encrypt from "../utils/hashPassword";
import { createJWT } from "../utils/jwtUtils";

class EmployerService {
  constructor(
    private employerRepository: EmployerRepository,
    private createJWT: createJWT,
    private encrypt: Encrypt
  ) {}

  async employerLogin(user: any): Promise<EmployerAuthResponse | undefined> {
    try {
      const employer = await this.employerRepository.emailExistCheck(user.email);
      if (employer) {
        if (employer.isBlocked) {
          return {
            status: 401,
            data: {
              success: false,
              message: "You have been blocked",
            },
          };
        }
        if (employer.password && user.password) {
          const passwordMatch = await this.encrypt.compare(
            user.password,
            employer.password
          );
          if (passwordMatch) {
            const token = this.createJWT.generateToken({
              id: employer.id,
              email: employer.email,
              role:'employer'
            });
            return {
              status: 200,
              data: {
                success: true,
                message: "Authentication successful",
                userId: employer.id,
                token: token,
              },
            } as const;
          } else {
            return {
              status: 401,
              data: {
                success: false,
                message: "Authentication failed",
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

  async isEmailExist(email: string): Promise<Employer | null>{
    try {
      const isEmployerExist = await this.employerRepository.emailExistCheck(email)
      return isEmployerExist
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async saveEmployer(employerData: Employer): Promise<EmployerAuthResponse>{
    try {
      const hashPassword = await this.encrypt.createHash(employerData.password)
      employerData.password = hashPassword
      const employer = await this.employerRepository.saveEmployer(employerData)
      return {
        status: 200,
        data: {
          success: true,
          message: 'Success',
          userId:employer?.id
        }
      }
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean>{
    try {
      const hashedPassword = await this.encrypt.createHash(newPassword)
      return this.employerRepository.updatePassword(email,hashedPassword)
    } catch (error) {
      console.log(error)
      throw new Error('Internal server error')
    }
  }







}

export default EmployerService;
