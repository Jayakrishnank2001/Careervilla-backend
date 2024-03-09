import express from "express";
import { adminAuthMiddleware } from "../middlewares/adminAuth";
import AdminController from "../controllers/adminController";
import AdminService from "../services/adminService";
import AdminRepository from "../repositories/adminRepository";
import { createJWT } from "../utils/jwtUtils";

const adminRouter = express.Router();

const jwtCreate = new createJWT();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository, jwtCreate);
const adminController = new AdminController(adminService);

adminRouter.post('/login', async (req, res) => adminController.adminLogin(req, res));
adminRouter.get('/employers', async (req, res) => adminController.getAllEmployers(req, res))
adminRouter.get('/jobseekers', async (req, res) => adminController.getAllJobseekers(req, res))
adminRouter.patch('/employers/block/:employerId', async (req, res) => adminController.blockEmployer(req, res))
adminRouter.patch('/jobseekers/block/:jobseekerId', async (req, res) => adminController.blockJobseeker(req, res))
adminRouter.post('/create-plan', async (req, res) => adminController.createPlan(req, res))
adminRouter.put('/update-plan/:planId', async (req, res) => adminController.editPlan(req, res))
adminRouter.delete('/delete-plan/:planId', async (req, res) => adminController.deletePlan(req, res))
adminRouter.get('/subscription-plans', async (req, res) => adminController.getPlans(req, res))



export default adminRouter;
