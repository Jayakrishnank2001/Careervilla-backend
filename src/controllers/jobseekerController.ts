import { Request, Response } from "express";
import Jobseeker from "../interfaces/entityInterfaces/jobseeker";
import JobseekerService from "../services/jobseekerService";

class JobseekerController {
    constructor(private jobseekerService: JobseekerService) { }

    async jobseekerLogin(req: Request, res: Response): Promise<void> {
        const user = req.body
        try {
            const loginStatus = await this.jobseekerService.jobseekerLogin(user)
            if (loginStatus && loginStatus.data && typeof loginStatus.data == 'object' && 'token' in loginStatus.data) {
                res.cookie('jobseekerJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                res.status(loginStatus.status).json(loginStatus)
            } else {
                res.status(401).json(loginStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async jobseekerSignup(req: Request, res: Response): Promise<void> {

    }
}

export default JobseekerController