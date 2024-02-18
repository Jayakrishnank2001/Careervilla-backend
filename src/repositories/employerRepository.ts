import Employer from "../interfaces/entityInterfaces/employer";
import IEmployerRepository from "../interfaces/repositoryInterfaces/employerRepository";
import EmployerModel from "../models/employerModel";

class EmployerRepository implements IEmployerRepository{
    async employerLogin(email: string): Promise <Employer | null> {
        try {
            const employer=await EmployerModel.findOne({email:email})
            return employer as Employer
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export default EmployerRepository
