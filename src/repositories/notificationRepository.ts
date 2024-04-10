import { ObjectId } from "mongoose";
import Notification, { NotificationData } from "../interfaces/entityInterfaces/INotification";
import INotificationRepository from "../interfaces/repositoryInterfaces/INotificationRepository";
import NotificationModel from "../models/notificationModel";

class NotificationRepository implements INotificationRepository {

    async saveNotification(userId: ObjectId, notificationData: NotificationData): Promise<void> {
        try {
            const notificaton = await NotificationModel.findOneAndUpdate({ userId: userId },
                {
                    $push: {
                        content: {
                            title: notificationData.title,
                            body: notificationData.body
                        }
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

    async getNotifications(userId: string): Promise<Notification | null> {
        try {
            const notifications = await NotificationModel.findOne({ userId: userId })
            return notifications
        } catch (error) {
            console.error(error)
            return null
        }
    }

}
export default NotificationRepository