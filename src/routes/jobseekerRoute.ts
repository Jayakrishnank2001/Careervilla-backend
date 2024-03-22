import express from 'express'
import JobseekerController from '../controllers/jobseekerController'
import JobseekerService from '../services/jobseekerService'
import JobseekerRepository from '../repositories/jobseekerRepository'
import { createJWT } from '../utils/jwtUtils'
import Encrypt from '../utils/hashPassword'
import { jobseekerAuthMiddleware } from '../middlewares/jobseekerAuth'
import JobRepository from '../repositories/jobRepository'
import JobService from '../services/jobService'
import CompanyRepository from '../repositories/companyRepository'
import AddressRepository from '../repositories/addressRepository'
import JobController from '../controllers/jobController'
import JobApplicationRepository from '../repositories/jobApplicationRepository'
import JobApplicationService from '../services/jobApplicationService'
import JobApplicationController from '../controllers/jobApplicationController'

const jobseekerRouter = express.Router()

const jwtCreate = new createJWT()
const encrypt = new Encrypt()
const jobseekerRepository = new JobseekerRepository()
const jobseekerService = new JobseekerService(jobseekerRepository, jwtCreate, encrypt)
const jobseekerController = new JobseekerController(jobseekerService)

jobseekerRouter.post('/login', async (req, res) => jobseekerController.jobseekerLogin(req, res))
jobseekerRouter.post('/googleLogin', async (req, res) => jobseekerController.googleLogin(req, res))
jobseekerRouter.post('/signup', async (req, res) => jobseekerController.jobseekerSignup(req, res))
jobseekerRouter.post('/verifyOTP', async (req, res) => jobseekerController.verifyOTP(req, res)) 
jobseekerRouter.post('/forgotPassword', async(req,res)=>jobseekerController.forgotPassword(req,res))
jobseekerRouter.post('/resendOTP', async (req, res) => jobseekerController.resendOTP(req, res))
jobseekerRouter.post('/resetPassword', async (req, res) => jobseekerController.resetPassword(req, res))
jobseekerRouter.get('/getDetails/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.getJobseekerDetails(req, res))


const jobRepository = new JobRepository()
const companyRepository = new CompanyRepository()
const addressRepository=new AddressRepository()
const jobService = new JobService(jobRepository, companyRepository, addressRepository)
const jobController = new JobController(jobService)

jobseekerRouter.get('/jobs', async (req, res) => jobController.getAllJobs(req, res))


const jobApplicationRepository = new JobApplicationRepository()
const jobApplicationService = new JobApplicationService(jobApplicationRepository)
const jobApplicationController = new JobApplicationController(jobApplicationService)

jobseekerRouter.post('/applyJob', jobseekerAuthMiddleware, async (req, res) => jobApplicationController.applyJob(req, res))









export default jobseekerRouter