import { notificationRes } from "../common/ICommon";
import Notification from "../entityInterfaces/INotification";

export interface INotificationService{

    generateNotification(jobId: string): Promise<notificationRes>
    getNotifications(userId: string): Promise<Notification | undefined>
    

}