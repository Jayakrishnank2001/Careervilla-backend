import { Request, Response } from "express";
import AdminService from "../services/adminService";
import { STATUS_CODES } from '../constants/httpStatusCodes';

const { OK, INTERNAL_SERVER_ERROR } = STATUS_CODES

class AdminController {
  constructor(private adminService: AdminService) { }

  async adminLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
      const loginStatus = await this.adminService.adminLogin(
        username,
        password
      );
      if (
        loginStatus.data &&
        typeof loginStatus.data == "object" &&
        "token" in loginStatus.data
      ) {
        res.cookie("adminJWT", loginStatus.data.token, {
          httpOnly: true,
          sameSite: "none",
          // secure: process.env.NODE_ENV !== "development",
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(loginStatus.status).json(loginStatus);
      } else {
        res.status(loginStatus.status).json(loginStatus);
      }
    } catch (error) {
      console.log(error);
      res.status(INTERNAL_SERVER_ERROR).json({error:'Internal server error'})
    }
  }
  async getAllEmployers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string)
      const limit = parseInt(req.query.limit as string)
      const searchQuery = req.query.searchQuery as string | undefined
      const data = await this.adminService.getAllEmployers(page, limit, searchQuery)
      res.status(OK).json(data)
    } catch (error) {
      console.log(error)
      res.status(INTERNAL_SERVER_ERROR).json({error:'Internal server error'})
    }
  }

  async getAllJobseekers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string)
      const limit = parseInt(req.query.limit as string)
      const searchQuery = req.query.searchQuery as string | undefined
      const data = await this.adminService.getAllJobseekers(page, limit, searchQuery)
      res.status(OK).json(data)
    } catch (error) {
      console.log(error)
      res.status(INTERNAL_SERVER_ERROR).json({error:'Internal server error'})
    }
  }

  async blockEmployer(req: Request, res: Response) {
    try {
      await this.adminService.blockEmployer(req.params.employerId as string)
      res.status(OK).json({
        success: true,
        message:'blocked/unblocked employer successfully'
      })
    } catch (error) {
      console.log(error)
      res.status(INTERNAL_SERVER_ERROR).json({error:'Internal server error'})
    }
  }

  async blockJobseeker(req: Request, res: Response) {
    try {
      await this.adminService.blockJobseeker(req.params.jobseekerId as string)
      res.status(OK).json({
        success: true,
        message:'blocked/unblocked jobseeker successfully'
      })
    } catch (error) {
      console.log(error)
      res.status(INTERNAL_SERVER_ERROR).json({error:'Internal server error'})
    }
  }











}

export default AdminController;
