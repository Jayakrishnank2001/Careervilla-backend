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

    async changePassword(req: Request, res: Response) {
        try {
            const { jobseekerEmail, newPassword, confirmPassword } = req.body
            if (newPassword !== confirmPassword) {
                return res.status(BAD_REQUEST).json({ message: 'Passwords do not match.' })
            }
            const success = await this.jobseekerService.resetPassword(jobseekerEmail, newPassword)
            if (success) {
                return res.status(OK).json({
                    success: true,
                    message: 'Password reset successful'
                })
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async updatePhoneNumber(req: Request, res: Response) {
        try {
            const phoneNumber = req.body.phoneNumber
            const jobseekerId = req.params.jobseekerId
            const updateNumber = await this.jobseekerService.updatePhoneNumber(jobseekerId, phoneNumber)
            if (updateNumber) {
                res.status(updateNumber.status).json(updateNumber)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async updateLocation(req: Request, res: Response) {
        try {
            const location = req.body.location
            const jobseekerId = req.params.jobseekerId
            const updateLocation = await this.jobseekerService.updateLocation(jobseekerId, location)
            if (updateLocation) {
                res.status(updateLocation.status).json(updateLocation)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async updatePhoto(req: Request, res: Response) {
        try {
            const url = req.body.url
            const jobseekerId = req.params.jobseekerId
            const updatePhoto = await this.jobseekerService.updatePhoto(jobseekerId, url)
            if (updatePhoto) {
                res.status(updatePhoto.status).json(updatePhoto)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async addResume(req: Request, res: Response) {
        try {
            const url = req.body.url
            const jobseekerId = req.params.jobseekerId
            const addResume = await this.jobseekerService.addResume(jobseekerId, url)
            if (addResume) {
                res.status(addResume.status).json(addResume)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async deleteResume(req: Request, res: Response) {
        try {
            const jobseekerId = req.params.jobseekerId
            const deleteResume = await this.jobseekerService.deleteResume(jobseekerId)
            if (deleteResume) {
                res.status(deleteResume.status).json(deleteResume)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async saveJob(req: Request, res: Response) {
        try {
            const jobseeker = await this.jobseekerService.saveJob(req.body.jobseekerId, req.body.jobId)
            if (jobseeker) {
                res.status(jobseeker?.status).json(jobseeker)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async unsaveJob(req: Request, res: Response) {
        try {
            const jobseeker = await this.jobseekerService.unsaveJob(req.body.jobseekerId, req.body.jobId)
            if (jobseeker) {
                res.status(jobseeker?.status).json(jobseeker)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async getSavedJobs(req: Request, res: Response) {
        try {
            const savedJobs = await this.jobseekerService.getSavedJobs(req.params.jobseekerId)
            if (savedJobs) {
                res.status(STATUS_CODES.OK).json(savedJobs)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }

    async getAppliedJobs(req: Request, res: Response) {
        try {
            const appliedJobs = await this.jobseekerService.getAppliedJobs(req.params.jobseekerId)
            if (appliedJobs) {
                res.status(STATUS_CODES.OK).json(appliedJobs)
            }
        } catch (error) {
            console.error(error)
            return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
        }
    }
  







}

export default JobseekerController