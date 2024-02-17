import AdminRepository from "../repositories/adminRepository";
import { createJWT } from "../utils/jwtUtils";
import Admin from "../interfaces/entityInterfaces/admin";

class AdminService{
    constructor(private adminRepository:AdminRepository,private createJWT:createJWT){}

    async adminLogin(username:string,password:string):Promise<{admin:Admin|null,token:string|null}>{
        const admin=await this.adminRepository.adminLogin(username,password)
        if(!admin){
            return {admin:null,token:null}
        }
        const token=this.createJWT.generateToken({id:admin.id,username:admin.username})
        return { admin,token }
    }
}

export default AdminService


