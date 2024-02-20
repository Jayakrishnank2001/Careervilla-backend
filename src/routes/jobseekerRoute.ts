import express from 'express'
import { jobseekerAuthMiddleware } from '../middlewares/jobseekerAuth'
import JobseekerController from '../controllers/jobseekerController'
import JobseekerService from '../services/jobseekerService'
import JobseekerRepository from '../repositories/jobseekerRepository'
import { createJWT } from '../utils/jwtUtils'
import Encrypt from '../utils/hashPassword'

const jobseekerRouter = express.Router()

const jwtCreate = new createJWT()
const encrypt = new Encrypt()
const jobseekerRepository = new JobseekerRepository()
const jobseekerService = new JobseekerService(jobseekerRepository, jwtCreate, encrypt)
const jobseekerController = new JobseekerController(jobseekerService)

jobseekerRouter.post('/login', async (req, res) => jobseekerController.jobseekerLogin(req, res))
jobseekerRouter.post('/signup', async (req, res) => jobseekerController.jobseekerSignup(req, res))





export default jobseekerRouter