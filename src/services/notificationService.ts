import { ObjectId } from "mongoose";
import { INotificationService } from "../interfaces/serviceInterfaces/INotificationService";
import NotificationRepository from "../repositories/notificationRepository";
import Notification from "../interfaces/entityInterfaces/INotification";


class NotificationService implements INotificationService {

    constructor(private notificationRepository: NotificationRepository) { }

    async getNotifications(userId: string): Promise<Notification | undefined> {
        try {
            const notifications = await this.notificationRepository.getNotifications(userId)
            if (notifications) {
                return notifications
            }
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }






}
export default NotificationService