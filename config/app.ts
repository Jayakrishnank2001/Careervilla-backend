import express from 'express'
import cors from 'cors'
import http from 'http'
import cookieParser from 'cookie-parser'
import adminRouter from '../src/routes/adminRoute'
import jobseekerRouter from '../src/routes/jobseekerRoute'
import employerRouter from '../src/routes/employerRoute'
import { ErrorHandler } from '../src/middlewares/errorHandler'
import dotenv from 'dotenv'
dotenv.config()

export const createServer = () => {
    try {
        const app = express()
        http.createServer(app)
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser())

        app.use(
            cors({
                origin: process.env.CORS_URL,
                credentials: true
            })
        )

        app.use('/api/admin', adminRouter)
        app.use('/api/jobseeker', jobseekerRouter)
        app.use('/api/employer', employerRouter)

        app.use(ErrorHandler.handle)

        return app

    } catch (error) {
        console.log('error logging from createServer, from app.ts')
        console.log('error caught from app')
        console.log((error as Error).message)
    }

}