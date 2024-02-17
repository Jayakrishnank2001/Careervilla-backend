import AdminModel from "../models/adminModel";
import IAdminRepository from "../interfaces/repositoryInterfaces/adminRepository";
import Admin from "../interfaces/entityInterfaces/admin";


class AdminRepository implements IAdminRepository{
    async adminLogin(username:string,password:string):Promise<Admin|null>{
        try{
           const admin=await AdminModel.findOne({username:username,password:password})
           return admin
        }catch(error){
           console.error('Error in admin login repository:',error)
           return null
        }
    }
}

export default AdminRepository
