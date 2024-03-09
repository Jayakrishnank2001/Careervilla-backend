import AdminRepository from "../repositories/adminRepository";
import { createJWT } from "../utils/jwtUtils";
import { AdminAuthResponse, AdminResponse, IEmployersAndCount, IJobseekersAndCount } from "../interfaces/serviceInterfaces/adminService";
import Admin from "../interfaces/entityInterfaces/admin";
import { IApiRes } from "../interfaces/common/common";
import SubscriptionPlan from "../interfaces/entityInterfaces/subscriptionPlan";

class AdminService {
    constructor(
        private adminRepository: AdminRepository,
        private createJWT: createJWT
    ) { }

    async adminLogin(username: string, password: string): Promise<AdminAuthResponse> {
        try {
            const admin = await this.adminRepository.adminLogin(username, password);
            if (admin) {
                const token = this.createJWT.generateToken({
                    id: admin.id,
                    username: admin.username,
                    role:'admin'
                });
                return {
                    status: 200,
                    data: {
                        success: true,
                        message: "Authentication successful",
                        adminId: admin.id,
                        token: token,
                    },
                } as const;
            } else {
                return {
                    status: 401,
                    data: {
                        success: false,
                        message: "Authenticaion failed",
                    },
                } as const;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    async getAllEmployers(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IEmployersAndCount | null>>{
        try {
            if (isNaN(page)) page = 1
            if (isNaN(limit)) limit = 10
            if (!searchQuery) searchQuery = ''
            const employers = await this.adminRepository.getAllEmployers(page, limit, searchQuery)
            const employersCount = await this.adminRepository.getEmployersCount(searchQuery)
            return {
                status: 200,
                message: 'success',
                data:{employers,employersCount}
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async getAllJobseekers(page: number, limit: number, searchQuery: string | undefined): Promise<IApiRes<IJobseekersAndCount | null>>{
        try {
            if (isNaN(page)) page = 1
            if (isNaN(limit)) limit = 10
            if (!searchQuery) searchQuery = ''
            const jobseekers = await this.adminRepository.getAllJobseekers(page, limit, searchQuery)
            const jobseekersCount = await this.adminRepository.getJobseekersCount(searchQuery)
            return {
                status: 200,
                message: 'success',
                data:{jobseekers,jobseekersCount}
            }
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async blockEmployer(employerId: string) {
        try {
            await this.adminRepository.blockEmployer(employerId)
        } catch (error) {
            console.log(error)
        }
    }

    async blockJobseeker(jobseekerId: string) {
        try {
            await this.adminRepository.blockJobseeker(jobseekerId)
        } catch (error) {
            console.log(error)
        }
    }

    async createPlan(planData: SubscriptionPlan): Promise<AdminResponse>{
        try {
            const planExist = await this.adminRepository.planExists(planData)
            if (!planExist) {
                const newPlan = await this.adminRepository.savePlan(planData)
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan created successfully'
                    }
                }
            } else {
                return {
                    status: 200,
                    data: {
                        success: false,
                        message:'Plan Already Exists'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async editPlan(planId: string, updates: Partial<SubscriptionPlan>): Promise<AdminResponse>{
        try {
            const updatedPlan = await this.adminRepository.updatePlan(planId, updates)
            if (updatedPlan) {
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan updated successfully'
                    }
                }
            } else {
                return {
                    status: 404,
                    data: {
                        success: false,
                        message:'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async deletePlan(planId: string): Promise<AdminResponse>{
        try {
            const isDeleted = await this.adminRepository.deletePlan(planId)
            if (isDeleted) {
                return {
                    status: 200,
                    data: {
                        success: true,
                        message:'Plan deleted Successfully'
                    }
                }
            } else {
                return {
                    status: 404,
                    data: {
                        success: false,
                        message:'Plan not found'
                    }
                }
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }

    async getPlans(): Promise<SubscriptionPlan[]>{
        try {
            return this.adminRepository.getAllPlans()
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }








}

export default AdminService;
