import express from "express";
import { adminAuthMiddleware } from "../middlewares/adminAuth";
import AdminController from "../controllers/adminController";
import AdminService from "../services/adminService";
import AdminRepository from "../repositories/adminRepository";
import { createJWT } from "../utils/jwtUtils";
import SubscriptionRepository from "../repositories/subscriptionRepository";
import SubscriptionService from "../services/subscriptionService";
import SubscriptionController from "../controllers/subscriptionController";
import EmployerRepository from "../repositories/employerRepository";
import ReportedJobRepository from "../repositories/reportedJobRepository";
import ReportedJobService from "../services/reportedJobService";
import ReportedJobController from "../controllers/reportedJobcontroller";
import JobRepository from "../repositories/jobRepository";
import IndustryRepository from "../repositories/industryRepository";
import IndustryService from "../services/industryService";
import IndustryController from "../controllers/industryController";

const adminRouter = express.Router();

const jwtCreate = new createJWT();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository, jwtCreate);
const adminController = new AdminController(adminService);

adminRouter.post('/login', async (req, res) => adminController.adminLogin(req, res));
adminRouter.get('/employers', adminAuthMiddleware,async (req, res) => adminController.getAllEmployers(req, res))
adminRouter.get('/jobseekers', adminAuthMiddleware, async (req, res) => adminController.getAllJobseekers(req, res))
adminRouter.patch('/employers/block/:employerId', adminAuthMiddleware, async (req, res) => adminController.blockEmployer(req, res))
adminRouter.patch('/jobseekers/block/:jobseekerId', adminAuthMiddleware, async (req, res) => adminController.blockJobseeker(req, res))


const subscriptionRepository = new SubscriptionRepository()
const employerRepository=new EmployerRepository()
const subscriptionService = new SubscriptionService(subscriptionRepository,employerRepository)
const subscriptionController = new SubscriptionController(subscriptionService)

adminRouter.post('/create-plan', adminAuthMiddleware, async (req, res) => subscriptionController.createPlan(req, res))
adminRouter.put('/update-plan/:planId', adminAuthMiddleware, async (req, res) => subscriptionController.editPlan(req, res))
adminRouter.delete('/delete-plan/:planId', adminAuthMiddleware, async (req, res) => subscriptionController.deletePlan(req, res))
adminRouter.get('/subscription-plans', adminAuthMiddleware, async (req, res) => subscriptionController.getPlans(req, res))


const reportedJobRepository = new ReportedJobRepository()
const jobRepository=new JobRepository()
const reportedJobService = new ReportedJobService(reportedJobRepository,jobRepository)
const reportedJobController = new ReportedJobController(reportedJobService)

adminRouter.get('/reportedJobs', adminAuthMiddleware, async (req, res) => reportedJobController.getAllReportedJobs(req, res))
adminRouter.patch('/block-reportedJob', adminAuthMiddleware, async (req, res) => reportedJobController.blockReportedJob(req, res))
adminRouter.get('/reportedJob-details/:jobId', adminAuthMiddleware, async (req, res) => reportedJobController.reportedJobDetails(req, res))


const industryRepository = new IndustryRepository()
const industryService = new IndustryService(industryRepository)
const industryController = new IndustryController(industryService)

adminRouter.get('/industries', adminAuthMiddleware, async (req, res) => industryController.getAllIndustries(req, res))
adminRouter.post('/add-industry', adminAuthMiddleware, async (req, res) => industryController.addIndustry(req, res))
adminRouter.delete('/delete-industry/:industryId', adminAuthMiddleware, async (req, res) => industryController.deleteIndustry(req, res))
adminRouter.put('/update-industry/:industryId', adminAuthMiddleware, async (req, res) => industryController.updateIndustry(req, res))



export default adminRouter;
