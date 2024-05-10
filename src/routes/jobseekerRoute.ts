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
import ReportedJobRepository from '../repositories/reportedJobRepository'
import ReportedJobService from '../services/reportedJobService'
import ReportedJobController from '../controllers/reportedJobcontroller'
import EmployerRepository from '../repositories/employerRepository'
import NotificationRepository from '../repositories/notificationRepository'
import CompanyService from '../services/companyService'
import CompanyController from '../controllers/companyController'
import ReviewRepository from '../repositories/reviewRepository'
import ReviewService from '../services/reviewService'
import ReviewController from '../controllers/reviewController'
import MessageRepository from '../repositories/messageRepository'
import MessageService from '../services/messageService'
import MessageController from '../controllers/messageController'
import ChatRepository from '../repositories/chatRepository'
import IndustryRepository from '../repositories/industryRepository'
import IndustryService from '../services/industryService'
import IndustryController from '../controllers/industryController'

const jobseekerRouter = express.Router()

const jwtCreate = new createJWT()
const encrypt = new Encrypt()
const jobseekerRepository = new JobseekerRepository()
const jobApplicationRepository = new JobApplicationRepository()
const jobseekerService = new JobseekerService(jobseekerRepository, jwtCreate, encrypt, jobApplicationRepository)
const jobseekerController = new JobseekerController(jobseekerService)

jobseekerRouter.post('/login', async (req, res) => jobseekerController.jobseekerLogin(req, res))
jobseekerRouter.post('/googleLogin', async (req, res) => jobseekerController.googleLogin(req, res))
jobseekerRouter.post('/signup', async (req, res) => jobseekerController.jobseekerSignup(req, res))
jobseekerRouter.post('/verifyOTP', async (req, res) => jobseekerController.verifyOTP(req, res))
jobseekerRouter.post('/forgotPassword', async (req, res) => jobseekerController.forgotPassword(req, res))
jobseekerRouter.post('/resendOTP', async (req, res) => jobseekerController.resendOTP(req, res))
jobseekerRouter.post('/resetPassword', async (req, res) => jobseekerController.resetPassword(req, res))
jobseekerRouter.get('/getDetails/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.getJobseekerDetails(req, res))
jobseekerRouter.put('/changePassword', jobseekerAuthMiddleware, async (req, res) => jobseekerController.changePassword(req, res))
jobseekerRouter.put('/changePhoneNumber/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.updatePhoneNumber(req, res))
jobseekerRouter.put('/changeLocation/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.updateLocation(req, res))
jobseekerRouter.put('/updatePhoto/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.updatePhoto(req, res))
jobseekerRouter.post('/addResume/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addResume(req, res))
jobseekerRouter.delete('/deleteResume/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.deleteResume(req, res))
jobseekerRouter.post('/saveJob', jobseekerAuthMiddleware, async (req, res) => jobseekerController.saveJob(req, res))
jobseekerRouter.post('/unsaveJob', jobseekerAuthMiddleware, async (req, res) => jobseekerController.unsaveJob(req, res))
jobseekerRouter.get('/savedJobs/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobseekerController.getSavedJobs(req, res))
jobseekerRouter.patch('/withdraw-application', jobseekerAuthMiddleware, async (req, res) => jobseekerController.withdrawApplication(req, res))
jobseekerRouter.post('/add-recent-work', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addRecentWork(req, res))
jobseekerRouter.post('/add-education', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addEducation(req, res))
jobseekerRouter.post('/add-salary', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addSalary(req, res))
jobseekerRouter.post('/add-jobTypes', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addJobTypes(req, res))
jobseekerRouter.post('/add-skills', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addSkills(req, res))
jobseekerRouter.post('/add-languages', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addLanguages(req, res))
jobseekerRouter.post('/add-jobTitles', jobseekerAuthMiddleware, async (req, res) => jobseekerController.addJobTitles(req, res))




const jobRepository = new JobRepository()
const companyRepository = new CompanyRepository()
const addressRepository = new AddressRepository()
const employerRepository = new EmployerRepository()
const industryRepository = new IndustryRepository()
const jobService = new JobService(jobRepository, companyRepository, addressRepository, employerRepository,industryRepository,jobseekerRepository)
const jobController = new JobController(jobService)

jobseekerRouter.get('/jobs', async (req, res) => jobController.getAllJobs(req, res))

const jobApplicationService = new JobApplicationService(jobApplicationRepository, jobseekerRepository)
const jobApplicationController = new JobApplicationController(jobApplicationService)

jobseekerRouter.post('/apply-job', jobseekerAuthMiddleware, async (req, res) => jobApplicationController.applyJob(req, res))
jobseekerRouter.get('/get-appliedJobs/:jobseekerId', jobseekerAuthMiddleware, async (req, res) => jobApplicationController.getAppliedJobsApplications(req, res))



const reportedJobRepository = new ReportedJobRepository()
const reportedJobService = new ReportedJobService(reportedJobRepository, jobRepository)
const reportedJobController = new ReportedJobController(reportedJobService)

jobseekerRouter.post('/reportJob', jobseekerAuthMiddleware, async (req, res) => reportedJobController.reportJob(req, res))


const companyService = new CompanyService(companyRepository, addressRepository, employerRepository)
const companyController = new CompanyController(companyService)

jobseekerRouter.get('/companies', jobseekerAuthMiddleware, async (req, res) => companyController.getAllCompanies(req, res))


const reviewRepository = new ReviewRepository()
const reviewService = new ReviewService(reviewRepository)
const reviewController = new ReviewController(reviewService)

jobseekerRouter.post('/post-review', jobseekerAuthMiddleware, async (req, res) => reviewController.postReview(req, res))
jobseekerRouter.get('/get-reviews', jobseekerAuthMiddleware, async (req, res) => reviewController.getAllReviews(req, res))
jobseekerRouter.delete('/delete-review/:reviewId', jobseekerAuthMiddleware, async (req, res) => reviewController.deleteReview(req, res))

const messageRepository = new MessageRepository()
const chatRepository = new ChatRepository()
const messageService = new MessageService(messageRepository, chatRepository)
const messageController = new MessageController(messageService)

jobseekerRouter.get('/messages', jobseekerAuthMiddleware, async (req, res) => messageController.getAllMessages(req, res))
jobseekerRouter.get('/get-chats', jobseekerAuthMiddleware, async (req, res) => messageController.getAllChats(req, res))


const industryService = new IndustryService(industryRepository)
const industryController = new IndustryController(industryService)
 

jobseekerRouter.get('/industries', jobseekerAuthMiddleware, async (req, res) => industryController.getAllIndustries(req, res))







export default jobseekerRouter