import { Request, Response } from "express";
import NotificationService from "../services/notificationService";
import { STATUS_CODES } from "../constants/httpStatusCodes";



class NotificationController {

    constructor(private notificationService: NotificationService) { }

    async getNotifications(req: Request, res: Response) {
        try {
            const notifications = await this.notificationService.getNotifications(req.params.employerId)
            if (notifications) {
                res.status(STATUS_CODES.OK).json(notifications)
            }
        } catch (error) {
            console.log(error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
        }
    }


    


}
export default NotificationController