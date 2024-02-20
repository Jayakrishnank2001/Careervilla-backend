import { Request, Response } from "express";
import Employer from "../interfaces/entityInterfaces/employer";
import EmployerService from "../services/employerService";

class EmployerController {
  constructor(private employerService: EmployerService) { }

  async employerLogin(req: Request, res: Response): Promise<void> {
    const user = req.body;
    try {
      const loginStatus = await this.employerService.employerLogin(user);
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
        res.status(401).json(loginStatus);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async employerSignup(req: Request, res: Response): Promise<void> { }
}

export default EmployerController;
