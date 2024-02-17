import express from 'express';
import { adminAuthMiddleware } from '../middlewares/adminAuth';
import AdminController from '../controllers/adminController';
import AdminService from '../services/adminServices';
import AdminRepository from '../repositories/adminRepository';
import { createJWT } from '../utils/jwtUtils';
const adminRouter=express.Router()

const jwtCreate=new createJWT()
const adminRepository=new AdminRepository()
const adminService=new AdminService(adminRepository,jwtCreate)
const adminController=new AdminController(adminService)


adminRouter.post('/login',async(req,res)=>adminController.adminLogin(req,res))












export default adminRouter