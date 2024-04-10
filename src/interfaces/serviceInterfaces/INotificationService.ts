import Notification from "../entityInterfaces/INotification";


export interface INotificationService{

    getNotifications(userId: string): Promise<Notification | undefined>
    

}