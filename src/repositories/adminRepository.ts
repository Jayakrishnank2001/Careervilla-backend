import AdminModel from "../models/adminModel";
import IAdminRepository from "../interfaces/repositoryInterfaces/adminRepository";
import Admin from "../interfaces/entityInterfaces/admin";
import EmployerModel from "../models/employerModel";
import Employer from "../interfaces/entityInterfaces/employer";
import JobseekerModel from "../models/jobseekerModel";
import Jobseeker from "../interfaces/entityInterfaces/jobseeker";
import SubscriptionPlan from "../interfaces/entityInterfaces/subscriptionPlan";
import SubscriptionPlanModel from "../models/subscriptionPlanModel";


class AdminRepository implements IAdminRepository {

    async adminLogin(username: string, password: string): Promise<Admin | null> {
        try {
            const admin = await AdminModel.findOne({ username: username, password: password })
            return admin
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getAllEmployers(page: number, limit: number, searchQuery: string): Promise<Employer[]> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            const result = await EmployerModel.find({
                $or: [
                    { firstName: { $regex: regex } },
                    { email: { $regex: regex } },
                    { phoneNumber: { $regex: regex } }
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password')
                .exec()
            return result as Employer[]
        } catch (error) {
            console.error(error)
            throw new Error('Error occured')
        }
    }

    async getEmployersCount(searchQuery: string): Promise<number> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            return await EmployerModel.find({
                $or: [
                    { firstName: { $regex: regex } },
                    { email: { $regex: regex } },
                    { phoneNumber: { $regex: regex } }
                ]
            }).countDocuments()
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }


    async getAllJobseekers(page: number, limit: number, searchQuery: string): Promise<Jobseeker[]> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            const result = await JobseekerModel.find({
                $or: [
                    { firstName: { $regex: regex } },
                    { email: { $regex: regex } },
                    { phoneNumber: { $regex: regex } }
                ]
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password')
                .exec()
            return result as Jobseeker[]
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async getJobseekersCount(searchQuery: string): Promise<number> {
        try {
            const regex = new RegExp(searchQuery, 'i')
            return await JobseekerModel.find({
                $or: [
                    { firstName: { $regex: regex } },
                    { email: { $regex: regex } },
                    { phoneNumber: { $regex: regex } }
                ]
            }).countDocuments()
        } catch (error) {
            console.log(error)
            throw new Error('Error occured')
        }
    }

    async blockEmployer(employerId: string): Promise<void> {
        try {
            const employer = await EmployerModel.findById({ _id: employerId })
            if (employer !== null) {
                employer.isBlocked = !employer.isBlocked
                await employer.save()
            } else {
                throw Error('Something went wrong')
            }
        } catch (error) {
            throw new Error('Error occured')
        }
    }

    async blockJobseeker(jobseekerId: string): Promise<void> {
        try {
            const jobseeker = await JobseekerModel.findById({ _id: jobseekerId })
            if (jobseeker !== null) {
                jobseeker.isBlocked = !jobseeker.isBlocked
                await jobseeker.save()
            } else {
                throw Error('Something went wrong')
            }
        } catch (error) {
            throw new Error('Error occured')
        }
    }







}

export default AdminRepository
