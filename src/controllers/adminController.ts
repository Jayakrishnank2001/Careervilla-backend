import { Request,Response } from "express";
import Admin from "../interfaces/entityInterfaces/admin";
import AdminService from "../services/adminServices";

class AdminController{
    constructor(private adminService:AdminService){}

    async adminLogin(req:Request,res:Response):Promise<void>{
        const { username,password }=req.body
        try{
           const { admin,token }=await this.adminService.adminLogin(username,password)
           if(!admin){
            res.status(401).json({message:'Invalid credentials'})
            return 
           }
           res.json({admin,token})
        }catch(error){
            console.error('Error during login:',error)
            res.status(500).json({message:'Internal Server Error'})
        }
    }
}

export default AdminController