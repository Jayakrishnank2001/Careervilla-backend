import Employer from "../interfaces/entityInterfaces/employer";
import EmployerRepository from "../repositories/employerRepository";
import Encrypt from "../utils/hashPassword";
import { createJWT } from "../utils/jwtUtils";

class EmployerService{
    constructor(private employerRepository:EmployerRepository,private createJWT:createJWT,private encrypt:Encrypt){}

    async employerLogin(user:any){
        try {
            const employer=await this.employerRepository.employerLogin(user.email)
            if(employer){
                if(employer.isBlocked){
                    return {
                        status:401,
                        data:{
                            success:false,
                            message:'You have been blocked'
                        }
                    }
                }
                if(employer.password && user.password){
                    const passwordMatch=await this.encrypt.compare(user.password,employer.password)
                    if(passwordMatch){
                        const token=this.createJWT.generateToken({id:employer.id,email:employer.email})
                        return {
                            status:200,
                            data:{
                                success:true,
                                message:'Authentication successful',
                                userId:employer.id,
                                token:token
                            }
                        }as const
                    }else{
                        return {
                            status:401,
                            data:{
                                success:false,
                                message:'Authentication failed'
                            }
                        }as const
                    }
                }
            }else{
                return {
                    status:401,
                    data:{
                        success:false,
                        message:'Authentication failed'
                    }
                }as const
            }
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error')
        }
    }
}

export default EmployerService