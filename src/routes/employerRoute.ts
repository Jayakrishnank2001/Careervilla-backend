import express from 'express'
import { createJWT } from '../utils/jwtUtils'
import Encrypt from '../utils/hashPassword'
import EmployerController from '../controllers/employerController'
import EmployerService from '../services/employerService'
import EmployerRepository from '../repositories/employerRepository'
import { employerAuthMiddleware } from '../middlewares/employerAuth'

const employerRouter=express.Router()

const jwtCreate=new createJWT()
const encrypt=new Encrypt()
const employerRepository=new EmployerRepository()
const employerService=new EmployerService(employerRepository,jwtCreate,encrypt)
const employerController=new EmployerController(employerService)


employerRouter.post('/login', async(req,res) => employerController.employerLogin(req,res))





export default employerRouter