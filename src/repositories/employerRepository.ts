import Employer from "../interfaces/entityInterfaces/IEmployer";
import IEmployerRepository from "../interfaces/repositoryInterfaces/IEmployerRepository";
import EmployerModel from "../models/employerModel";
import SubscriptionPlanModel, { SubscriptionPlanInterface } from "../models/subscriptionPlanModel";

class EmployerRepository implements IEmployerRepository {

    async emailExistCheck(email: string): Promise<Employer | null> {
        try {
            const employerFound = await EmployerModel.findOne({ email })
            return employerFound as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async saveEmployer(employer: Employer): Promise<Employer | null> {
        try {
            const newEmployer = new EmployerModel(employer)
            await newEmployer.save()
            return newEmployer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatePassword(email: string, newPassword: string): Promise<boolean> {
        try {
            const updatedEmployer = await EmployerModel.findOneAndUpdate(
                { email: email },
                { password: newPassword },
                { new: true }
            )
            return !!updatedEmployer
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async showPlans(): Promise<SubscriptionPlanInterface[]> {
        try {
            const plans = await SubscriptionPlanModel.find().exec()
            return plans.map((plan) => plan.toObject())
        } catch (error) {
            console.error(error)
            return []
        }
    }

    async updateCompanyId(employerId: string, companyId: string): Promise<Employer | null> {
        try {
            const updatedEmployer = await EmployerModel.findByIdAndUpdate(
                employerId,
                { companyId: companyId },
                { new: true }
            )
            return updatedEmployer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getEmployerData(employerId: string): Promise<Employer | null> {
        try {
            const employer = await EmployerModel.findById(employerId).populate('companyId').exec()
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatePlanExpiration(employerId: string, newExpirationDate: Date): Promise<Employer | null> {
        try {
            const employer = EmployerModel.findByIdAndUpdate(employerId, { planExpiresAt: newExpirationDate,isSubscribed:true })
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatePhoneNumber(employerId: string, phoneNumber: string): Promise<Employer | null> {
        try {
            const employer =await EmployerModel.findByIdAndUpdate(employerId, { phoneNumber: phoneNumber }, { new: true })
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updateLocation(employerId: string, location: string): Promise<Employer | null> {
        try {
            const employer = await EmployerModel.findByIdAndUpdate(employerId, { location: location }, { new: true })
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async updatePhoto(employerId: string, url: string): Promise<Employer | null> {
        try {
            const employer = await EmployerModel.findByIdAndUpdate(employerId, { image: url }, { new: true })
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }





}

export default EmployerRepository
