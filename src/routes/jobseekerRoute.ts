import express from 'express'
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
jobseekerRouter.post('/verifyOTP', async (req, res) => jobseekerController.verifyOTP(req, res)) 
jobseekerRouter.post('/forgotPassword', async(req,res)=>jobseekerController.forgotPassword(req,res))
jobseekerRouter.post('/resendOTP', async (req, res) => jobseekerController.resendOTP(req, res))
jobseekerRouter.post('/resetPassword', async (req, res) => jobseekerController.resetPassword(req, res))





export default jobseekerRouter