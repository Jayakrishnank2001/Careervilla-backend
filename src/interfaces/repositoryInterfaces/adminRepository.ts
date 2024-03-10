import Admin from "../entityInterfaces/admin";
import { UpdateResult } from "mongodb";
import Employer from "../entityInterfaces/employer";
import Jobseeker from "../entityInterfaces/jobseeker";
import SubscriptionPlan from "../entityInterfaces/subscriptionPlan";

interface IAdminRepository {
  adminLogin(username: string, password: string): Promise<Admin | null>;
  getAllEmployers(page: number, limit: number, searchQuery: string): Promise<Employer[]>
  getEmployersCount(searchQuery:string):Promise<number>
  getAllJobseekers(page: number, limit: number, searchQuery: string): Promise<Jobseeker[]>
  getJobseekersCount(searchQuery: string): Promise<number>
  blockEmployer(employerId: string): Promise<void>
  blockJobseeker(jobseekerId: string): Promise<void>
  
}

export default IAdminRepository;
