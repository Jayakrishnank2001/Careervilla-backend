import JobseekerRepository from "../repositories/jobseekerRepository";
import { createJWT } from "../utils/jwtUtils";
import Encrypt from "../utils/hashPassword";
import Jobseeker from "../interfaces/entityInterfaces/jobseeker";

class JobseekerService {
  constructor(
    private jobseekerRepository: JobseekerRepository,
    private createJWT: createJWT,
    private encrypt: Encrypt
  ) { }

  async jobseekerLogin(user: any) {
    try {
      const jobseeker = await this.jobseekerRepository.jobseekerLogin(
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
}

export default JobseekerService;
