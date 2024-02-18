import AdminRepository from "../repositories/adminRepository";
import { createJWT } from "../utils/jwtUtils";
import Admin from "../interfaces/entityInterfaces/admin";

class AdminService{
    constructor(private adminRepository:AdminRepository,private createJWT:createJWT){}

    async adminLogin(username:string,password:string){
        try {
            const admin=await this.adminRepository.adminLogin(username,password)
            if(admin){
                const token=this.createJWT.generateToken({id:admin.id,username:admin.username})
                return{
                    status:200,
                    data:{
                        success:true,
                        message:'Authentication successful',
                        adminId:admin.id,
                        token:token
                    }
                }as const
            }else{
                return{
                    status:401,
                    data:{
                        success:false,
                        message:'Authenticaion failed'
                    }
                }as const 
     
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }
}

export default AdminService


