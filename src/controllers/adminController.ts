import { Request, Response } from "express";
import Admin from "../interfaces/entityInterfaces/admin";
import AdminService from "../services/adminService";

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
          secure: process.env.NODE_ENV !== "development",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(loginStatus.status).json(loginStatus);
      } else {
        res.status(loginStatus.status).json(loginStatus);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Internal server error'})
    }
  }
  async getAllEmployers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string)
      const limit = parseInt(req.query.limit as string)
      const searchQuery = req.query.searchQuery as string | undefined
      const data = await this.adminService.getAllEmployers(page, limit, searchQuery)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  }

  async getAllJobseekers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string)
      const limit = parseInt(req.query.limit as string)
      const searchQuery = req.query.searchQuery as string | undefined
      const data = await this.adminService.getAllJobseekers(page, limit, searchQuery)
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  }

  async blockEmployer(req: Request, res: Response) {
    try {
      const data = await this.adminService.blockEmployer(req.params.employerId as string)
      res.status(200).json({
        success: true,
        message:'blocked/unblocked employer successfully'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  }

  async blockJobseeker(req: Request, res: Response) {
    try {
      const data = await this.adminService.blockJobseeker(req.params.jobseekerId as string)
      res.status(200).json({
        success: true,
        message:'blocked/unblocked jobseeker successfully'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  }











}

export default AdminController;
