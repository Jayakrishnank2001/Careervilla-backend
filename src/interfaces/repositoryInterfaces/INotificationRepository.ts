import { ObjectId } from "mongoose"
import Notification, { NotificationData } from "../entityInterfaces/INotification"


interface INotificationRepository{
    saveNotification(userId: ObjectId, notificationData: NotificationData): Promise<void>
    getNotifications(userId: string): Promise<Notification | null>

}
export default INotificationRepository