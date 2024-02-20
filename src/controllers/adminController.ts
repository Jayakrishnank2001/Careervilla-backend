import { Request, Response } from "express";
import Admin from "../interfaces/entityInterfaces/admin";
import AdminService from "../services/adminService";

class AdminController {
  constructor(private adminService: AdminService) { }

  async adminLogin(req: Request, res: Response): Promise<void> {
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
    }
  }
}

export default AdminController;
