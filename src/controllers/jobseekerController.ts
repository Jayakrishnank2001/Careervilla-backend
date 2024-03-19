import { Request, Response } from "express";
import JobseekerService from "../services/jobseekerService";
import { generateAndSendOTP } from "../utils/otpGenerator";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST } = STATUS_CODES

class JobseekerController {
    constructor(private jobseekerService: JobseekerService) { }

    async jobseekerLogin(req: Request, res: Response) {
        const user = req.body
        try {
            const loginStatus = await this.jobseekerService.jobseekerLogin(user.email, user.password)
            if (loginStatus && loginStatus.data && typeof loginStatus.data == 'object' && 'token' in loginStatus.data) {
                res.cookie('jobseekerJWT', loginStatus.data.token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                res.status(loginStatus.status).json(loginStatus)
            } else {
                res.status(UNAUTHORIZED).json(loginStatus)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async jobseekerSignup(req: Request, res: Response) {
        try {
            const jobseeker = req.body
            req.app.locals.isNewRegistration = true
            const emailExists = await this.jobseekerService.isEmailExist(jobseeker.jobseekerData.email)
            if (!emailExists) {
                req.app.locals.jobseekerData = jobseeker;
                req.app.locals.email = jobseeker.jobseekerData.email
                const otp = await generateAndSendOTP(jobseeker.jobseekerData.email);
                req.app.locals.otp = otp;

                const expirationMinutes = 1;
                setTimeout(() => {
                    delete req.app.locals.otp;
                }, expirationMinutes * 60 * 1000);

                res.status(OK).json({
                    userId: null,
                    success: true,
                    message: 'OTP sent for verification',
                });
            } else {
                res.status(BAD_REQUEST).json({ message: 'Email already exists' });
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }

    async verifyOTP(req: Request, res: Response) {
        try {
            const { otp } = req.body
            const isNewRegistration = req.app.locals.isNewRegistration
            const savedJobseeker = req.app.locals.jobseekerData
            if (otp === req.app.locals.otp) {
                if (isNewRegistration) {
                    const savedUser = await this.jobseekerService.saveJobseeker(savedJobseeker.jobseekerData)
                    req.app.locals = {}
                    res.status(OK).json(savedUser)
                } else {
                    res.status(OK).json()
                }
            } else {
                res.status(BAD_REQUEST).json({ message: 'Incorrect OTP' })
            }
        } catch (error) {
            console.error(error)
            res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' })
        }
    }

    async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            req.app.locals.email = email
            const emailExists = await this.jobseekerService.isEmailExist(email)
            if (emailExists) {
                const otp = await generateAndSendOTP(email)
                req.app.locals.otp = otp
                const expirationMinutes = 1
                setTimeout(() => {
                    delete req.app.locals.otp
                }, expirationMinutes * 60 * 1000)
                res.status(OK).json({
                    success: true,
                    message: 'OTP send for verification'
                })
            } else {
                res.status(BAD_REQUEST).json({ message: 'Invalid Email' })
            }
        } catch (error) {
            console.log(error)
            res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async resendOTP(req: Request, res: Response) {
        try {
            const email = req.app.locals.email
            const newOTP = await generateAndSendOTP(email)
            req.app.locals.otp = newOTP
            const expirationMinutes = 1
            setTimeout(() => {
                delete req.app.locals.otp
            }, expirationMinutes * 60 * 1000)
            res.status(OK).json({
                success: true,
                message: 'New OTP sent successfully'
            })
        } catch (error) {
            console.error(error)
            res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { newPassword, confirmPassword } = req.body
            const email = req.app.locals.email
            if (newPassword !== confirmPassword) {
                return res.status(BAD_REQUEST).json({ message: 'Passwords do not match.' })
            }
            const success = await this.jobseekerService.resetPassword(email, newPassword)
            req.app.locals = {}
            if (success) {
                return res.status(OK).json({
                    success: true,
                    message: 'Password reset successful'
                })
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async googleLogin(req: Request, res: Response) {
        try {
            const user = req.body
            const loginStatus = await this.jobseekerService.googleLogin(user.email, user.firstName, user.image)
            if (loginStatus) {
                res.status(loginStatus.status).json(loginStatus)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async getJobseekerDetails(req: Request, res: Response) {
        try {
            const jobseekerId = req.params.jobseekerId
            const jobseekerData = await this.jobseekerService.getJobseekerData(jobseekerId)
            res.status(OK).json(jobseekerData)
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }
















}

export default JobseekerController