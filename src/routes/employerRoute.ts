import express from 'express'
import { createJWT } from '../utils/jwtUtils'
import Encrypt from '../utils/hashPassword'
import EmployerController from '../controllers/employerController'
import EmployerService from '../services/employerService'
import EmployerRepository from '../repositories/employerRepository'
import { employerAuthMiddleware } from '../middlewares/employerAuth'
import SubscriptionRepository from '../repositories/subscriptionRepository'
import SubscriptionService from '../services/subscriptionService'
import SubscriptionController from '../controllers/subscriptionController'
import CompanyRepository from '../repositories/companyRepository'
import CompanyService from '../services/companyService'
import CompanyController from '../controllers/companyController'
import AddressRepository from '../repositories/addressRepository'
import JobRepository from '../repositories/jobRepository'
import JobService from '../services/jobService'
import JobController from '../controllers/jobController'
import NotificationRepository from '../repositories/notificationRepository'
import NotificationService from '../services/notificationService'
import NotificationController from '../controllers/notificationController'

const employerRouter = express.Router()

const jwtCreate = new createJWT()
const encrypt = new Encrypt()
const employerRepository = new EmployerRepository()
const employerService = new EmployerService(employerRepository, jwtCreate, encrypt)
const employerController = new EmployerController(employerService)

employerRouter.post('/login', async (req, res) => employerController.employerLogin(req, res))
employerRouter.post('/googleLogin', async (req, res) => employerController.googleLogin(req, res))
employerRouter.post('/signup', async (req, res) => employerController.employerSignup(req, res))
employerRouter.post('/verifyOTP', async (req, res) => employerController.verifyOTP(req, res))
employerRouter.post('/forgotPassword', async (req, res) => employerController.forgotPassword(req, res))
employerRouter.post('/resendOTP', async (req, res) => employerController.resendOTP(req, res))
employerRouter.post('/resetPassword', async (req, res) => employerController.resetPassword(req, res))
employerRouter.get('/getDetails/:employerId', employerAuthMiddleware, async (req, res) => employerController.getEmployerDetails(req, res))
employerRouter.put('/changePassword', employerAuthMiddleware, async (req, res) => employerController.changePassword(req, res))
employerRouter.put('/changePhoneNumber/:employerId', employerAuthMiddleware, async (req, res) => employerController.updatePhoneNumber(req, res))
employerRouter.put('/changeLocation/:employerId', employerAuthMiddleware, async (req, res) => employerController.updateLocation(req, res))
employerRouter.put('/updatePhoto/:employerId', employerAuthMiddleware, async (req, res) => employerController.updatePhoto(req, res))
employerRouter.get('/postedJobs/:employerId', employerAuthMiddleware, async (req, res) => employerController.getPostedJobs(req, res))


const subscriptionRepository = new SubscriptionRepository()
const subscriptionService = new SubscriptionService(subscriptionRepository,employerRepository)
const subscriptionController = new SubscriptionController(subscriptionService)

employerRouter.get('/subscription-plans', employerAuthMiddleware, async (req, res) => subscriptionController.getPlans(req, res))
employerRouter.post('/payment/:employerId', employerAuthMiddleware, async (req, res) => subscriptionController.makePayment(req, res))


const companyRepository = new CompanyRepository()
const addressRepository=new AddressRepository()
const companyService = new CompanyService(companyRepository,addressRepository,employerRepository)
const companyController = new CompanyController(companyService)

employerRouter.post('/addCompany/:employerId', async (req, res) => companyController.saveCompany(req, res))
employerRouter.get('/companyDetails/:companyId', employerAuthMiddleware, async (req, res) => companyController.getCompanyDetails(req, res))
employerRouter.post('/update-companyLogo', employerAuthMiddleware, async (req, res) => companyController.updateCompanyLogo(req, res))
employerRouter.put('/updateCompany', employerAuthMiddleware, async (req, res) => companyController.updateCompanyDetails(req, res))


const jobRepository = new JobRepository()
const jobService = new JobService(jobRepository,companyRepository,addressRepository,employerRepository)
const jobController = new JobController(jobService)

employerRouter.post('/addJob/:employerId', employerAuthMiddleware, async (req, res) => jobController.saveJob(req, res))


const notificationRepository = new NotificationRepository()
const notificationService = new NotificationService(notificationRepository)
const notificationController = new NotificationController(notificationService)

employerRouter.get('/notifications/:employerId', employerAuthMiddleware, async (req, res) => notificationController.getNotifications(req, res))











export default employerRouter