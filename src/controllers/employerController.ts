import { Request, Response } from "express";
import EmployerService from "../services/employerService";
import { generateAndSendOTP } from "../utils/otpGenerator";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST } = STATUS_CODES


class EmployerController {
  constructor(private employerService: EmployerService) { }

  async employerLogin(req: Request, res: Response): Promise<void> {
    const user = req.body;
    try {
      const loginStatus = await this.employerService.employerLogin(user.email, user.password);
      if (
        loginStatus &&
        loginStatus.data &&
        typeof loginStatus.data == "object" &&
        "token" in loginStatus.data
      ) {
        res.cookie("employerJWT", loginStatus.data.token, {
          httpOnly: true,
          sameSite: "none",
          secure: process.env.NODE_ENV !== "development",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(loginStatus.status).json(loginStatus);
      } else {
        res.status(UNAUTHORIZED).json(loginStatus);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async employerSignup(req: Request, res: Response): Promise<void> {
    try {
      req.app.locals.isNewRegistration = true
      const employer = req.body
      const emailExists = await this.employerService.isEmailExist(employer.employerData.email)
      if (!emailExists) {
        req.app.locals.employerData = employer
        req.app.locals.email = employer.employerData.email
        const otp = await generateAndSendOTP(employer.employerData.email)
        req.app.locals.otp = otp
        res.status(OK).json({
          userId: null,
          message: 'OTP send for verification'
        })
      } else {
        res.status(BAD_REQUEST).json({ message: 'Email already exists' })
      }
    } catch (error) {
      console.log(error)
      res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  async verifyOTP(req: Request, res: Response) {
    try {
      const { otp } = req.body
      const isNewRegistration = req.app.locals.isNewRegistration
      const savedEmployer = req.app.locals.employerData
      if (otp === req.app.locals.otp) {
        if (isNewRegistration) {
          const savedUser = await this.employerService.saveEmployer(savedEmployer.employerData)
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
      const emailExists = await this.employerService.isEmailExist(email)
      if (emailExists) {
        const otp = await generateAndSendOTP(email)
        req.app.locals.otp = otp
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
      const success = await this.employerService.resetPassword(email, newPassword)
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
      const loginStatus = await this.employerService.googleLogin(user.email, user.firstName, user.image)
      if (loginStatus) {
        res.status(loginStatus.status).json(loginStatus)
      }
    } catch (error) {
      console.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }

  async getEmployerDetails(req: Request, res: Response) {
    try {
      const employerId=req.params.employerId
      const employerData = await this.employerService.getEmployerData(employerId)
      res.status(OK).json(employerData)
    } catch (error) {
      console.error(error)
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' })
    }
  }






}

export default EmployerController;
